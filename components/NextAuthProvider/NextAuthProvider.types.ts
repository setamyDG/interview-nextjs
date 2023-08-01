import { SessionProviderProps } from 'next-auth/react';
import { ReactNode } from 'react';

export type Props = {
  session?: SessionProviderProps['session'];
  children: ReactNode;
};
