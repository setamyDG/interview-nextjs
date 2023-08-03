import QuestionForm from '@components/QuestionForm/QuestionForm';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: {
    id: string;
    type: string;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => ({
  title: `Question of | ${params.type} with id ${params.id}`,
  description: `Edit mode of question form`,
});

const EditQuestion = (): JSX.Element => {
  return <QuestionForm />;
};

export default EditQuestion;
