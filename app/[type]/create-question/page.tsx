import CreateQuestionForm from '@components/CreateQuestionForm';
import { revalidateTag } from 'next/cache';

const CreateQuestion = () => {
  // using server-actions
  const createQuestion = async (data: FormData) => {
    'use server';
    await fetch('https://64c59304c853c26efadae416.mockapi.io/api/questions', {
      method: 'POST',
      body: JSON.stringify(data),
      next: {
        tags: ['questions'],
      },
      headers: {
        'Content-type': 'application/json',
      },
    });
    revalidateTag('questions');
  };

  return (
    <section className='bg-white rounded-2xl sm:shadow-2xl px-12 py-12'>
      <CreateQuestionForm createQuestion={createQuestion} />
    </section>
  );
};

export default CreateQuestion;
