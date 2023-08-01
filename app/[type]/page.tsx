import { getQuestions } from '@api/questions';
import QuestionsList from '@components/QuestionsList/QuestionsList';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@utils/getQueryClient';
import { Metadata } from 'next';

type Props = {
  params: {
    type: string;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => ({
  title: `Questions of | ${params.type}`,
  description: `List of created questions and answers via users for ${params.type} topic.`,
});

const QuestionsPage = async (): Promise<JSX.Element> => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['questions'], getQuestions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <QuestionsList />
    </Hydrate>
  );
};

export default QuestionsPage;
