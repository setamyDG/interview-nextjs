'use server';

import { QueryKeys } from '@const/queryKeys';
import { revalidateTag } from 'next/cache';

export const createQuestion = async (data: FormData) => {
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
