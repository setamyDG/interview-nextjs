export const dynamic = 'force-dynamic';

import { getQuestions } from '@apiData/questions';
import Profile from '@components/Profile/Profile';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await getServerSession();

  return {
    title: `Profile | ${session?.user?.name}`,
    description: `Profile page for ${session?.user?.name} on the Next.js + TypeScript + Tailwind CSS + React Query + NextAuth.js boilerplate.`,
  };
};

const ProfilePage = async (): Promise<JSX.Element> => {
  const data = await getQuestions();
  return <Profile questions={data} />;
};

export default ProfilePage;
