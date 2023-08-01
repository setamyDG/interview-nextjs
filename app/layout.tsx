import Footer from '@components/Footer/Footer';
import Navigation from '@components/Navigation/Navigation';
import NextAuthProvider from '@components/NextAuthProvider/NextAuthProvider';
import ReactQueryProvider from '@components/ReactQueryProvider/ReactQueryProvider';
import AntdRegistry from '@lib/AntdRegistry';
import '@styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Overview | Page where you can see all the questions technology types',
  description: 'Overview page for the Next.js + TypeScript + Tailwind CSS + React Query + NextAuth.js boilerplate.',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props): JSX.Element => (
  <html lang='en'>
    <body className='md:bg-gray-100'>
      <AntdRegistry>
        <NextAuthProvider>
          <Navigation />
          <main className='app'>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </NextAuthProvider>
        <Footer />
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
