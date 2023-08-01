'use server';

import { revalidateTag } from 'next/cache';

export const createQuestion = async (data: FormData) => {
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
