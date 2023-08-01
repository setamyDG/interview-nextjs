'use client';

import { SessionProvider } from 'next-auth/react';
import { Props } from './NextAuthProvider.types';

const NextAuthProvider = ({ session, children }: Props): JSX.Element => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextAuthProvider;
