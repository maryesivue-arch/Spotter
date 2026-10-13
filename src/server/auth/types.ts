export interface MemberCtx {
  memberId: string;
  memberNumber: number;
  name: string;
  tier: 'BASIC' | 'PREMIUM';
  expiresAt: Date;
}

export interface StaffCtx {
  staffUserId: string;
  email: string;
  name: string;
  role: 'STAFF' | 'OWNER';
}

export type AuthContext =
  | { type: 'member'; ctx: MemberCtx }
  | { type: 'staff'; ctx: StaffCtx }
  | { type: 'unauthenticated' };
