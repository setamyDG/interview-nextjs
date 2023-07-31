'use client';

import { SearchOutlined } from '@ant-design/icons';
import { getQuestions } from '@api/questions';
import { Question } from '@customTypes/question';
import { useQuery } from '@tanstack/react-query';
import { Input, Spin } from 'antd';
import React, { useState } from 'react';
import TechCard, { TechCardType } from './TechCard';

const TechCardListData: TechCardType[] = [
  {
    title: 'Next.js',
    type: 'next',
    href: '/next',
    avatar: '/next.svg',
  },
  {
    title: 'React',
    type: 'react',
    href: '/react',
    avatar: '/react.svg',
  },
  {
    title: 'CSS',
    type: 'css',
    href: '/css',
    avatar: '/css.svg',
  },
  {
    title: 'HTML',
    type: 'html',
    href: '/html',
    avatar: '/html5.svg',
  },
  {
    title: 'MongoDB',
    type: 'mongodb',
    href: '/mongodb',
    avatar: '/mongodb.svg',
  },
];

const TechCardList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredData = TechCardListData.filter((techCard) =>
    techCard.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { data, isLoading } = useQuery<Question[], Error>(['techCards'], getQuestions);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <div className='my-4 flex items-center justify-center'>
        <Input
          style={{ width: 450 }}
          placeholder='Search for a tech'
          addonBefore={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4'>
        {filteredData.map((techCard) => {
          const questionCount = data?.filter((item) => item.techType === techCard.type).length;
          return <TechCard questionCount={questionCount} key={techCard.title} techCard={techCard} />;
        })}
      </div>
    </>
  );
};

export default TechCardList;
