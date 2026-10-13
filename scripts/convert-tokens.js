#!/usr/bin/env node

/**
 * ==============================================================================
 * Spotter Design System - Token to CSS Variable Converter
 * ==============================================================================
 *
 * This script transforms Figma design tokens (`design-tokens.tokens.json`)
 * into standard CSS Custom Properties (variables).
 *
 * DESIGN SYSTEM PRINCIPLES & SOURCE OF TRUTH:
 * ------------------------------------------------------------------------------
 * 1. TWO-TIER TOKEN ARCHITECTURE:
 *    - Layer 1 (Primitives): Raw color scales (e.g., primary-40, neutral-98).
 *      Primitives are foundational and MUST NOT be used directly in UI components.
 *    - Layer 2 (Color Roles): Semantic tokens (e.g., primary, on-primary, surface).
 *      Color Roles map primitive tokens to UI intent via `var(--primitive-...)`.
 *      These are the ONLY colors that should be used directly in component styling.
 *
 * 2. SOURCE OF TRUTH:
 *    - `design-tokens.tokens.json` is the sole source of truth.
 *    - The generated CSS is completely deterministic and reproducible.
 *    - Do not manually edit the generated CSS file.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

/**
 * Default Configuration
 */
const DEFAULT_CONFIG = {
  inputPath: path.resolve(process.cwd(), 'design-tokens.tokens.json'),
  outputPath: path.resolve(process.cwd(), 'src/app/tokens.css'),
  includeRgbTriplets: true,
  includeUtilities: true,
  includePathAliases: true,
  indent: '  ',
};

/**
 * Converts any string into kebab-case
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_.]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

/**
 * Converts a hex color (#rrggbb or #rrggbbaa) to an RGB triplet object
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number, rgbStr: string } | null}
 */
function parseHexColor(hex) {
  if (typeof hex !== 'string') return null;
  const clean = hex.replace('#', '').trim();
  if (clean.length === 6 || clean.length === 8) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const a = clean.length === 8 ? +(parseInt(clean.slice(6, 8), 16) / 255).toFixed(4) : 1;
    return { r, g, b, a, rgbStr: `${r}, ${g}, ${b}` };
  }
  return null;
}

/**
 * Extracts a normalized numeric tone string from a palette key.
 * e.g., 'primary40' -> '40', 'neutral-variant24' -> '24', '100' -> '100'
 * @param {string} palette
 * @param {string} key
 * @returns {string}
 */
function extractTone(palette, key) {
  const normPal = palette.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normKey.startsWith(normPal)) {
    return normKey.slice(normPal.length);
  }
  return key;
}

/**
 * Parses and indexes all design tokens from raw JSON data
 * @param {object} tokensData
 * @returns {object}
 */
function parseTokens(tokensData) {
  const primitivesByPath = new Map();
  const primitivesList = [];
  const rolesList = [];
  const typographyList = [];
  const effectsList = [];

  // 1. Process Primitives (Color Palettes)
  const colorPalettes = tokensData.primitives?.['color palletes'] || {};
  for (const [paletteName, paletteObj] of Object.entries(colorPalettes)) {
    const cleanPalette = toKebabCase(paletteName);
    const entries = Object.entries(paletteObj);

    // Sort tones numerically
    entries.sort(([k1], [k2]) => {
      const t1 = parseInt(extractTone(paletteName, k1), 10) || 0;
      const t2 = parseInt(extractTone(paletteName, k2), 10) || 0;
      return t1 - t2;
    });

    for (const [tokenKey, tokenDef] of entries) {
      const tone = extractTone(paletteName, tokenKey);
      const varName = `--primitive-color-${cleanPalette}-${tone}`;
      const rgbVarName = `--primitive-color-${cleanPalette}-${tone}-rgb`;
      const jsonPath = `primitives.color palletes.${paletteName}.${tokenKey}`;
      const pathAliasVar = `--primitives-color-palletes-${cleanPalette}-${toKebabCase(tokenKey)}`;
      const hexValue = tokenDef.value;
      const rgb = parseHexColor(hexValue);

      const record = {
        palette: paletteName,
        cleanPalette,
        tokenKey,
        tone,
        jsonPath,
        varName,
        rgbVarName,
        pathAliasVar,
        hexValue,
        rgb,
        description: tokenDef.description || null,
      };

      primitivesByPath.set(jsonPath, record);
      primitivesList.push(record);
    }
  }

  // Process Primitives (Key Colors)
  const keyColors = tokensData.primitives?.['key colors'] || {};
  const keyEntries = Object.entries(keyColors).sort(([k1], [k2]) => (+k1) - (+k2));
  for (const [tokenKey, tokenDef] of keyEntries) {
    const tone = extractTone('key', tokenKey);
    const varName = `--primitive-color-key-${tone}`;
    const rgbVarName = `--primitive-color-key-${tone}-rgb`;
    const jsonPath = `primitives.key colors.${tokenKey}`;
    const pathAliasVar = `--primitives-key-colors-${toKebabCase(tokenKey)}`;
    const hexValue = tokenDef.value;
    const rgb = parseHexColor(hexValue);

    const record = {
      palette: 'key colors',
      cleanPalette: 'key',
      tokenKey,
      tone,
      jsonPath,
      varName,
      rgbVarName,
      pathAliasVar,
      hexValue,
      rgb,
      description: tokenDef.description || null,
    };

    primitivesByPath.set(jsonPath, record);
    primitivesList.push(record);
  }

  // 2. Process Color Roles (Semantic tokens referencing primitives)
  const colorRoles = tokensData['color roles'] || {};
  for (const [roleName, roleDef] of Object.entries(colorRoles)) {
    const cleanRole = toKebabCase(roleName);
    const rawRef = roleDef.value; // e.g. "{primitives.color palletes.primary.primary40}"
    let refPath = null;
    let targetPrimitive = null;

    if (typeof rawRef === 'string' && rawRef.startsWith('{') && rawRef.endsWith('}')) {
      refPath = rawRef.slice(1, -1);
      targetPrimitive = primitivesByPath.get(refPath);
    }

    if (!targetPrimitive) {
      throw new Error(
        `[Token Converter Error] Color role "${roleName}" has broken reference "${rawRef}". Path could not be resolved in primitives.`
      );
    }

    const varName = `--color-${cleanRole}`;
    const roleAliasVar = `--color-role-${cleanRole}`;
    const rgbVarName = `--color-${cleanRole}-rgb`;

    rolesList.push({
      roleName,
      cleanRole,
      rawRef,
      refPath,
      targetPrimitive,
      varName,
      roleAliasVar,
      rgbVarName,
      description: roleDef.description || null,
    });
  }

  // 3. Process Typography
  const typography = tokensData.typography || {};
  for (const [styleName, styleDef] of Object.entries(typography)) {
    // Handle typography key typos gracefully (e.g. 'lebel medium' in Figma export)
    const normalizedName = styleName === 'lebel medium' ? 'label medium' : styleName;
    const cleanName = toKebabCase(normalizedName);
    const originalCleanName = toKebabCase(styleName);

    const fontSize = styleDef.fontSize?.value ?? 16;
    const lineHeight = styleDef.lineHeight?.value ?? 24;
    const fontWeight = styleDef.fontWeight?.value ?? 400;
    const fontFamily = styleDef.fontFamily?.value || 'DM Sans';
    const letterSpacing = styleDef.letterSpacing?.value ?? 0;

    typographyList.push({
      styleName: normalizedName,
      originalStyleName: styleName,
      cleanName,
      originalCleanName,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      fontWeight,
      fontFamily: `'${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      letterSpacing: `${letterSpacing}px`,
      shorthand: `${fontWeight} ${fontSize}px/${lineHeight}px '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    });
  }

  // 4. Process Effects (Custom Shadows)
  const effects = tokensData.effect || {};
  for (const [effectName, effectDef] of Object.entries(effects)) {
    const cleanName = toKebabCase(effectName);
    const val = effectDef.value || {};
    const offsetX = val.offsetX ?? 0;
    const offsetY = val.offsetY ?? 0;
    const radius = val.radius ?? 0;
    const spread = val.spread ?? 0;
    const color = val.color || 'rgba(0, 0, 0, 0.2)';

    // CSS Box-shadow: offsetX offsetY blur-radius spread-radius color
    const shadowCss = `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;

    effectsList.push({
      effectName,
      cleanName,
      varName: `--effect-${cleanName}`,
      shadowCss,
      value: val,
    });
  }

  return {
    primitivesList,
    rolesList,
    typographyList,
    effectsList,
    totalPrimitives: primitivesList.length,
    totalRoles: rolesList.length,
    totalTypography: typographyList.length,
    totalEffects: effectsList.length,
  };
}

/**
 * Formats grouped color roles with semantic section headers
 * @param {Array} roles
 * @returns {string}
 */
function formatColorRoles(roles) {
  const groups = {
    'Primary Roles': [],
    'Secondary Roles': [],
    'Tertiary Roles': [],
    'Surface & Background Roles': [],
    'Outline Roles': [],
    'Error Roles': [],
    'Scrim & Shadow Roles': [],
    'Other Roles': [],
  };

  for (const r of roles) {
    const name = r.cleanRole;
    if (name.includes('primary')) {
      groups['Primary Roles'].push(r);
    } else if (name.includes('secondary')) {
      groups['Secondary Roles'].push(r);
    } else if (name.includes('tertiary')) {
      groups['Tertiary Roles'].push(r);
    } else if (name.includes('error')) {
      groups['Error Roles'].push(r);
    } else if (name.includes('surface') || name.includes('background') || name.includes('inverse')) {
      groups['Surface & Background Roles'].push(r);
    } else if (name.includes('outline')) {
      groups['Outline Roles'].push(r);
    } else if (name === 'scrim' || name === 'shadow') {
      groups['Scrim & Shadow Roles'].push(r);
    } else {
      groups['Other Roles'].push(r);
    }
  }

  // Predefined preferred ordering within groups for maximum readability
  const orderRank = [
    // Primary
    'primary', 'on-primary', 'primary-container', 'on-primary-container',
    'primary-fixed', 'primary-fixed-dim', 'on-primary-fixed', 'on-primary-fixed-dim-variant',
    'inverse-primary',
    // Secondary
    'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
    'secondary-fixed', 'secondary-fixed-dim', 'on-secondary-fixed', 'on-secondary-fixed-variant',
    // Tertiary
    'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
    'tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed', 'on-tertiary-fixed-variant',
    // Error
    'error', 'on-error', 'error-container', 'on-error-container',
    // Surface & Background
    'surface', 'on-surface', 'surface-variant', 'on-surface-variant',
    'surface-container-lowest', 'surface-container-low', 'surface-container',
    'surface-container-high', 'surface-container-highest',
    'surface-bright', 'surface-dim',
    'surface-tint', 'surface-tint-color',
    'inverse-surface', 'inverse-on-surface',
    'background', 'on-background',
    // Outline
    'outline', 'outline-variant',
    // Scrim & Shadow
    'scrim', 'shadow',
  ];

  const lines = [];
  for (const [groupName, groupRoles] of Object.entries(groups)) {
    if (groupRoles.length === 0) continue;

    groupRoles.sort((a, b) => {
      const idxA = orderRank.indexOf(a.cleanRole);
      const idxB = orderRank.indexOf(b.cleanRole);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.cleanRole.localeCompare(b.cleanRole);
    });

    lines.push(`  /* --- ${groupName} --- */`);
    for (const r of groupRoles) {
      lines.push(`  ${r.varName}: var(${r.targetPrimitive.varName});`);
      lines.push(`  ${r.roleAliasVar}: var(${r.varName});`);
      if (r.targetPrimitive.rgb) {
        lines.push(`  ${r.rgbVarName}: var(${r.targetPrimitive.rgbVarName});`);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

/**
 * Generates the complete CSS stylesheet string from parsed design tokens
 * @param {object} parsed
 * @param {object} config
 * @returns {string}
 */
function generateCSS(parsed, config = DEFAULT_CONFIG) {
  const now = new Date().toISOString();
  const banner = `/**
 * ==============================================================================
 * Spotter Design System - CSS Custom Properties
 * ==============================================================================
 * 
 * AUTOMATICALLY GENERATED FILE - DO NOT EDIT DIRECTLY.
 * Source of Truth: design-tokens.tokens.json
 * Generated At: ${now}
 * 
 * ------------------------------------------------------------------------------
 * ARCHITECTURAL DESIGN SYSTEM RULES:
 * ------------------------------------------------------------------------------
 * 1. COLOR ROLES (Semantic Tokens):
 *    - MUST be used directly in UI implementations (buttons, cards, text, etc.).
 *    - Example: color: var(--color-on-surface);
 *    - Example: background-color: var(--color-surface);
 *    - Example: border-color: var(--color-outline);
 *    - Example: background-color: var(--color-primary);
 *
 * 2. PRIMITIVE COLORS (Foundational Palettes):
 *    - MUST NOT be used directly on UI components.
 *    - Primitives exist solely as the foundational palette scales from which
 *      Color Roles draw their values.
 *    - Using Color Roles ensures seamless theming and high-contrast adaptations.
 * ==============================================================================
 */`;

  const cssSections = [];

  // Root Variables
  cssSections.push(':root {');

  // 1. Primitive Colors
  cssSections.push(`  /* ==========================================================================
     1. PRIMITIVE COLORS (FOUNDATIONAL PALETTES)
     WARNING: Do NOT use these variables directly in UI components.
     Use the semantic Color Roles defined in Section 2 below.
     ========================================================================== */`);

  // Group primitives by palette
  const primitiveGroups = new Map();
  for (const p of parsed.primitivesList) {
    if (!primitiveGroups.has(p.palette)) {
      primitiveGroups.set(p.palette, []);
    }
    primitiveGroups.get(p.palette).push(p);
  }

  for (const [paletteName, items] of primitiveGroups) {
    cssSections.push(`  /* Palette: ${paletteName} */`);
    for (const p of items) {
      cssSections.push(`  ${p.varName}: ${p.hexValue};`);
      if (config.includeRgbTriplets && p.rgb) {
        cssSections.push(`  ${p.rgbVarName}: ${p.rgb.rgbStr};`);
      }
      if (config.includePathAliases && p.pathAliasVar !== p.varName) {
        cssSections.push(`  ${p.pathAliasVar}: var(${p.varName});`);
      }
    }
    cssSections.push('');
  }

  // 2. Color Roles (Semantic)
  cssSections.push(`  /* ==========================================================================
     2. COLOR ROLES (SEMANTIC TOKENS)
     GUIDELINE: Use these variables directly in UI component styling.
     They map semantic purpose to primitive scales via var().
     ========================================================================== */`);
  cssSections.push(formatColorRoles(parsed.rolesList));

  // 3. Typography Tokens
  cssSections.push(`  /* ==========================================================================
     3. TYPOGRAPHY TOKENS
     ========================================================================== */`);
  cssSections.push(`  --font-family-base: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`);
  cssSections.push('');

  for (const t of parsed.typographyList) {
    cssSections.push(`  /* ${t.styleName} */`);
    cssSections.push(`  --typography-${t.cleanName}-font-family: ${t.fontFamily};`);
    cssSections.push(`  --typography-${t.cleanName}-font-size: ${t.fontSize};`);
    cssSections.push(`  --typography-${t.cleanName}-font-weight: ${t.fontWeight};`);
    cssSections.push(`  --typography-${t.cleanName}-line-height: ${t.lineHeight};`);
    cssSections.push(`  --typography-${t.cleanName}-letter-spacing: ${t.letterSpacing};`);
    cssSections.push(`  --typography-${t.cleanName}: ${t.shorthand};`);

    // Add typo alias if original differed
    if (t.cleanName !== t.originalCleanName) {
      cssSections.push(`  --typography-${t.originalCleanName}: var(--typography-${t.cleanName});`);
    }
    cssSections.push('');
  }

  // 4. Effect Tokens (Shadows)
  cssSections.push(`  /* ==========================================================================
     4. ELEVATION & SHADOW TOKENS
     ========================================================================== */`);
  for (const e of parsed.effectsList) {
    cssSections.push(`  ${e.varName}: ${e.shadowCss};`);
  }
  cssSections.push('');

  cssSections.push('}');
  cssSections.push('');

  // 5. Utility Classes (Optional)
  if (config.includeUtilities) {
    cssSections.push(`/* ==========================================================================
   5. UI UTILITY CLASSES (STRICTLY USE COLOR ROLES & TYPOGRAPHY)
   ========================================================================== */`);

    // Typography utilities
    cssSections.push('/* Typography Utilities */');
    for (const t of parsed.typographyList) {
      cssSections.push(`.text-${t.cleanName}, .type-${t.cleanName} {`);
      cssSections.push(`  font-family: var(--typography-${t.cleanName}-font-family);`);
      cssSections.push(`  font-size: var(--typography-${t.cleanName}-font-size);`);
      cssSections.push(`  font-weight: var(--typography-${t.cleanName}-font-weight);`);
      cssSections.push(`  line-height: var(--typography-${t.cleanName}-line-height);`);
      cssSections.push(`  letter-spacing: var(--typography-${t.cleanName}-letter-spacing);`);
      cssSections.push('}');
      cssSections.push('');
    }

    // Shadow utilities
    cssSections.push('/* Elevation / Shadow Utilities */');
    for (const e of parsed.effectsList) {
      cssSections.push(`.shadow-${e.cleanName} {`);
      cssSections.push(`  box-shadow: var(${e.varName});`);
      cssSections.push('}');
      cssSections.push('');
    }

    // Core Semantic Color Utilities
    cssSections.push('/* Color Role Utilities (Semantic Backgrounds & Texts) */');
    for (const r of parsed.rolesList) {
      cssSections.push(`.bg-${r.cleanRole} { background-color: var(${r.varName}); }`);
      cssSections.push(`.text-${r.cleanRole} { color: var(${r.varName}); }`);
      cssSections.push(`.border-${r.cleanRole} { border-color: var(${r.varName}); }`);
    }
    cssSections.push('');
  }

  return `${banner}\n\n${cssSections.join('\n')}\n`;
}

/**
 * Main conversion function
 * @param {object} userConfig
 * @returns {{ css: string, parsed: object, outputPath: string }}
 */
function convertTokens(userConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  if (!fs.existsSync(config.inputPath)) {
    throw new Error(`[Token Converter Error] Input tokens file not found: ${config.inputPath}`);
  }

  const rawContent = fs.readFileSync(config.inputPath, 'utf8');
  let tokensData;
  try {
    tokensData = JSON.parse(rawContent);
  } catch (err) {
    throw new Error(`[Token Converter Error] Failed to parse JSON at ${config.inputPath}: ${err.message}`);
  }

  const parsed = parseTokens(tokensData);
  const css = generateCSS(parsed, config);

  if (config.outputPath) {
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(config.outputPath, css, 'utf8');
  }

  return { css, parsed, outputPath: config.outputPath };
}

/**
 * CLI Entrypoint
 */
function runCLI() {
  const args = process.argv.slice(2);
  const options = { ...DEFAULT_CONFIG };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--input' || arg === '-i') {
      options.inputPath = path.resolve(process.cwd(), args[++i]);
    } else if (arg === '--output' || arg === '-o') {
      options.outputPath = path.resolve(process.cwd(), args[++i]);
    } else if (arg === '--no-rgb') {
      options.includeRgbTriplets = false;
    } else if (arg === '--no-utilities') {
      options.includeUtilities = false;
    } else if (arg === '--no-aliases') {
      options.includePathAliases = false;
    } else if (arg === '--check') {
      options.checkOnly = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Spotter Design System - Token Converter CLI

Usage:
  node scripts/convert-tokens.js [options]

Options:
  -i, --input <path>     Path to design tokens JSON file (default: ./design-tokens.tokens.json)
  -o, --output <path>    Path to generated CSS variables file (default: ./src/app/tokens.css)
  --no-rgb               Do not generate -rgb triplet variables
  --no-utilities         Do not generate CSS utility classes
  --no-aliases           Do not generate full JSON path aliases
  --check                Validate tokens without writing output file
  -h, --help             Show this help message
`);
      process.exit(0);
    }
  }

  console.log(`Converting design tokens from: ${path.relative(process.cwd(), options.inputPath)}...`);

  if (options.checkOnly) {
    const rawContent = fs.readFileSync(options.inputPath, 'utf8');
    const parsed = parseTokens(JSON.parse(rawContent));
    console.log(`\n✓ Validation passed!`);
    console.log(`  - Found ${parsed.totalPrimitives} primitive color tokens`);
    console.log(`  - Resolved ${parsed.totalRoles} semantic color roles (100% valid references)`);
    console.log(`  - Found ${parsed.totalTypography} typography styles`);
    console.log(`  - Found ${parsed.totalEffects} effect shadow styles\n`);
    return;
  }

  const result = convertTokens(options);
  const relOutput = path.relative(process.cwd(), result.outputPath);
  const stats = fs.statSync(result.outputPath);
  const sizeKb = (stats.size / 1024).toFixed(2);

  console.log(`\n✓ Design tokens converted successfully!`);
  console.log(`  - Primitives:  ${result.parsed.totalPrimitives} foundational palette colors (Internal only)`);
  console.log(`  - Color Roles: ${result.parsed.totalRoles} semantic UI tokens (Directly used in UI)`);
  console.log(`  - Typography:  ${result.parsed.totalTypography} typography styles`);
  console.log(`  - Effects:     ${result.parsed.totalEffects} shadow styles`);
  console.log(`  - Written to:  ${relOutput} (${sizeKb} KB)\n`);
}

if (require.main === module) {
  try {
    runCLI();
  } catch (err) {
    console.error(`\n✖ Error: ${err.message}\n`);
    process.exit(1);
  }
}

module.exports = {
  convertTokens,
  parseTokens,
  generateCSS,
  DEFAULT_CONFIG,
};
