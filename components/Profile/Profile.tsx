'use client';

import { getQuestions } from '@apiData/questions';
import { QueryKeys } from '@const/queryKeys';
import { routes } from '@const/routes';
import { Question } from '@customTypes/question';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  questions: Question[];
};
const Profile = ({ questions }: Props): JSX.Element => {
  const { data: session } = useSession();
  const { data } = useQuery<Question[], Error>([QueryKeys.Questions], getQuestions, {
    initialData: questions,
  });
  // check should be done with user id
  const createdQuestions = data?.filter((question) => question.authorEmail === session?.user?.email).length;

  if (!session) {
    redirect(routes.overview);
  }

  return (
    <section>
      <div className='relative w-full rounded-2xl bg-white py-12 px-12 shadow-2xl'>
        <div className='absolute top-0 left-0 r-0 w-full bg-gradient-to-r from-cyan-800 to-blue-800 h-2/5 rounded-tl-2xl rounded-tr-2xl' />
        <div>
          <div className='flex flex-col'>
            <Image
              src={session?.user?.image as string}
              width={100}
              height={100}
              alt='user-logo'
              className='border-4 border-white rounded-full z-10'
            />
          </div>
          <div className='flex flex-col mt-4 justify-center'>
            <span className='font-semibold'>{session?.user?.name}</span>
            <span className='text-xs text-gray-400'>{session?.user?.email}</span>
            <span className='text-xs'>Created questions & answers: {createdQuestions}</span>
          </div>
        </div>
      </div>
      <div className='relative w-full rounded-2xl bg-white py-8 px-12 shadow-2xl mt-8'>
        <div className='flex flex-col justify-center'>
          <span className='font-semibold'>Skills</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
