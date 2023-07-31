/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  createQuestion: any;
};

const CreateQuestionForm = ({ createQuestion }: Props) => {
  const { type } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const create = async (formData: FormData) => {
    const techType = formData.get('techType')?.toString();
    const question = formData.get('question')?.toString();
    const answer = formData.get('answer')?.toString();

    const newQuestion = {
      techType,
      question,
      answer,
      authorName: session?.user?.name,
      authorEmail: session?.user?.email,
      createdAt: new Date().toISOString(),
      authorAvatar: session?.user?.image,
    };

    await createQuestion(newQuestion);
    router.back();
  };

  return (
    <form className='flex flex-col' action={create}>
      <label className='mb-2'>Technology</label>
      <input className='mb-4 border rounded-lg py-2 px-4 focus:outline-none ' name='techType' value={type} />
      <label className='mb-2'>Question</label>
      <textarea name='question' className='mb-4 border rounded-lg py-2 px-4 focus:outline-none' />
      <label className='mb-2'>Answer</label>
      <textarea name='answer' rows={8} className='mb-4 border rounded-lg py-2 px-4 focus:outline-none' />
      <div className='flex flex-end gap-3 mt-4'>
        <Button type='text' onClick={router.back}>
          Cancel
        </Button>
        <Button type='default' htmlType='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateQuestionForm;
