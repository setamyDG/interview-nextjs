import { Question } from '@customTypes/question';

export const getQuestions = async (): Promise<Question[]> => {
  const res = await fetch(`https://64c59304c853c26efadae416.mockapi.io/api/questions`);

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await fetch(`https://64c59304c853c26efadae416.mockapi.io/api/questions/${id}`, {
    method: 'DELETE',
  });
};

export const getQuestion = async (id: string): Promise<Question> => {
  const res = await fetch(`https://64c59304c853c26efadae416.mockapi.io/api/questions/${id}`);
  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
};
