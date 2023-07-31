'use server';

export const createQuestion = async (data: FormData) => {
  const techType = data.get('techType')?.toString();
  const question = data.get('question')?.toString();
  const answer = data.get('answer')?.toString();

  const newQuestion = {
    techType,
    question,
    answer,
    authorName: 'me',
    authorEmail: 'setamy.dg@gmail.com',
    createdAt: new Date().toISOString(),
    authorAvatar: 'some url',
  };

  await fetch('https://64c59304c853c26efadae416.mockapi.io/api/questions', {
    method: 'POST',
    body: JSON.stringify(newQuestion),
    headers: {
      'Content-type': 'application/json',
    },
  });
};
