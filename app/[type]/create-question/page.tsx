import QuestionForm from '@components/QuestionForm/QuestionForm';
import type { Metadata } from 'next';

type Props = {
  params: {
    type: string;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => ({
  title: `Creation question/answer form of | ${params.type}`,
  description: `Creation question & answer form for ${params.type} topic`,
});

const CreateQuestion = async (): Promise<JSX.Element> => (
  <section className='bg-white rounded-2xl sm:shadow-2xl px-12 py-12'>
    <QuestionForm />
  </section>
);

export default CreateQuestion;
