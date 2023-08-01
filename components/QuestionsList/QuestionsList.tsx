'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { deleteQuestion, getQuestions } from '@api/questions';
import { Question } from '@customTypes/question';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NoData from '../NoData/NoData';
import QuestionCard from '../QuestionCard/QuestionCard';

const QuestionsList = (): JSX.Element => {
  const { type } = useParams();
  const router = useRouter();
  const pageName = type.toString().toUpperCase();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data, isLoading } = useQuery<Question[], Error>({
    queryKey: ['questions'],
    queryFn: getQuestions,
  });

  const { mutateAsync: removeQuestion, isLoading: isDeleting } = useMutation(deleteQuestion, {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  if (isLoading || isDeleting) {
    return <Spin />;
  }

  const filteredData = data?.filter((item) => item.techType === type) || [];

  return (
    <section className='bg-white px-4 py-8 sm:shadow-2xl sm:px-12 sm:rounded-2xl'>
      <ArrowLeftOutlined className='text-4xl mb-8' onClick={router.back} />
      <div className='flex flex-col'>
        <h1 className='head_text'>
          Welcome to the Questions of <span className=' green_gradient border border-green-600 px-6'>{pageName}</span>{' '}
          🚀
          <span className='orange_gradient text-5xl'> Where curiosity meets knowledge and innovation!</span>
          <p className='desc'>
            Get ready to explore a captivating collection of thought-provoking questions, all centered around the
            fascinating world of {pageName}
          </p>
        </h1>
        <div className='mt-8'>
          <Button onClick={() => router.push(`${type}/create-question`)}>Create Question</Button>
        </div>
      </div>
      <Divider />
      {filteredData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4'>
          {filteredData?.map((item) => (
            <QuestionCard
              key={item.id}
              question={item}
              onEdit={() => console.log('a')}
              onDelete={() => removeQuestion(item.id as string)}
              actionsVisible={session?.user?.email === item.authorEmail}
            />
          ))}
        </div>
      ) : (
        <div className='mt-8'>
          <NoData />
        </div>
      )}
    </section>
  );
};

export default QuestionsList;
