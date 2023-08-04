'use client';

import { SearchOutlined } from '@ant-design/icons';
import { getQuestions } from '@apiData/questions';
import TechCard from '@components/TechCard/TechCard';
import { Question } from '@customTypes/question';
import { useQuery } from '@tanstack/react-query';
import { Input, Spin } from 'antd';
import { useState } from 'react';
import { TechCardListData } from './const';
import { Props } from './TechCardList.types';

const TechCardList = ({ questions }: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredData = TechCardListData.filter((techCard) =>
    techCard.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { data, isLoading } = useQuery<Question[], Error>(['techCards'], getQuestions, { initialData: questions });

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4'>
        {filteredData.map((techCard) => {
          const questionCount = data?.filter((item) => item.techType === techCard.type).length;
          return <TechCard questionCount={questionCount} key={techCard.title} techCard={techCard} />;
        })}
      </div>
    </>
  );
};

export default TechCardList;
