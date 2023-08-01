import ReactQueryProvider from '@components/ReactQueryProvider/ReactQueryProvider';
import '@styles/globals.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props): JSX.Element => (
  <main className='py-8 sm:px-72 md:px-16 px-8'>
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </main>
);

export default RootLayout;
