'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

type Props = {
  session?: SessionProviderProps['session'];
  children: React.ReactNode;
};
const NextAuthProvider = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
