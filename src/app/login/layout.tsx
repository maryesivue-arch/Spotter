import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Verified gym member app',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
