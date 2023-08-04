'use server';

import { QueryKeys } from '@const/queryKeys';
import { revalidateTag } from 'next/cache';

export const createQuestion = async (data: FormData): Promise<void> => {
  await fetch('https://64c59304c853c26efadae416.mockapi.io/api/questions', {
    method: 'POST',
    body: JSON.stringify(data),
    next: {
      tags: [QueryKeys.Questions],
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
  revalidateTag(QueryKeys.Questions);
};

export const updateQuestion = async (data: FormData, id: string): Promise<void> => {
  await fetch(`https://64c59304c853c26efadae416.mockapi.io/api/questions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    next: {
      tags: [QueryKeys.Questions],
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
  revalidateTag(QueryKeys.Questions);
};
