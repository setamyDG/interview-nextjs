import { getQuestions } from '@api/questions';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Profile from '@components/Profile/Profile';
import { routes } from '@const/routes';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await getServerSession(authOptions);

  return {
    title: `Profile | ${session?.user?.name}`,
    description: `Profile page for ${session?.user?.name} on the Next.js + TypeScript + Tailwind CSS + React Query + NextAuth.js boilerplate.`,
  };
};

const ProfilePage = async (): Promise<JSX.Element> => {
  const data = await getQuestions();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(routes.overview);
  }

  return <Profile questions={data} />;
};

export default ProfilePage;
