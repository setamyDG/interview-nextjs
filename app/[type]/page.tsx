import { getQuestions } from '@apiData/questions';
import QuestionsList from '@components/QuestionsList/QuestionsList';
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
  const data = await getQuestions();
  return <QuestionsList questions={data} />;
};

export default QuestionsPage;
