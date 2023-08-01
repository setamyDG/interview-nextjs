import { getQuestions } from '@api/questions';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Profile from '@components/Profile/Profile';
import { routes } from '@const/routes';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@utils/getQueryClient';
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
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['questions'], getQuestions);
  const dehydratedState = dehydrate(queryClient);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(routes.overview);
  }

  return (
    <Hydrate state={dehydratedState}>
      <Profile />
    </Hydrate>
  );
};

export default ProfilePage;
