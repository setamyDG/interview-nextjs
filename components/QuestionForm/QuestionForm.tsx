'use client';

import { createQuestion, updateQuestion } from '@actions/question';
import { getQuestion } from '@api/questions';
import { QueryKeys } from '@const/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const QuestionForm = (): JSX.Element => {
  const [fields, setFields] = useState({
    question: '',
    answer: '',
  });

  const { type, id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { data: editedQuestion } = useQuery([QueryKeys.Question, id], () => getQuestion(String(id)), {
    enabled: !!id,
  });

  useEffect(() => {
    if (editedQuestion) {
      setFields({
        question: editedQuestion.question,
        answer: editedQuestion.answer,
      });
    }
  }, [editedQuestion]);

  const create = async (formData: FormData) => {
    const techType = formData.get('techType')?.toString();
    const question = formData.get('question')?.toString();
    const answer = formData.get('answer')?.toString();

    const newQuestion = {
      ...formData,
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

  const update = async (formData: FormData) => {
    const question = formData.get('question')?.toString();
    const answer = formData.get('answer')?.toString();

    const updatedQuestion = {
      ...formData,
      question,
      answer,
      createdAt: new Date().toISOString(),
    };

    await updateQuestion(updatedQuestion, String(id));
    router.back();
  };

  return (
    <>
      <h2 className='head_text mb-8 orange_gradient'>{id ? 'Update' : 'Create'} Question</h2>
      <form className='flex flex-col' action={id ? update : create}>
        <label className='mb-2'>Technology</label>
        <input className='mb-4 border rounded-lg py-2 px-4 focus:outline-none ' name='techType' value={type} />
        <label className='mb-2'>Question</label>
        <textarea
          name='question'
          className='mb-4 border rounded-lg py-2 px-4 focus:outline-none'
          value={fields.question}
          onChange={(e) => setFields({ ...fields, question: e.target.value })}
        />
        <label className='mb-2'>Answer</label>
        <textarea
          name='answer'
          rows={8}
          className='mb-4 border rounded-lg py-2 px-4 focus:outline-none'
          value={fields.answer}
          onChange={(e) => setFields({ ...fields, answer: e.target.value })}
        />
        <div className='flex flex-end gap-3 mt-4'>
          <Button type='text' onClick={router.back}>
            Cancel
          </Button>
          <Button type='default' htmlType='submit'>
            {id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default QuestionForm;
