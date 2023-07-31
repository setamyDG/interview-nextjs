import { getQuestions } from '@api/questions';
import QuestionsList from '@components/QuestionsList';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@utils/getQueryClient';

const QuestionsPage = async () => {
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
