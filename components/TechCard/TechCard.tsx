'use client';

import Ribbon from 'antd/es/badge/Ribbon';
import Image from 'next/image';
import Link from 'next/link';
import { Props } from './TechCard.types';

const TechCard = ({ techCard, questionCount }: Props): JSX.Element => (
  <Link href={techCard.href}>
    <Ribbon text={`Questions: ${questionCount}`}>
      <div className='border border-gray-200 py-16 flex justify-center items-center hover:border-gray-300 ease-in duration-100 hover:shadow-lg'>
        <Image height={140} width={140} alt={techCard.title} src={techCard.avatar} />
      </div>
    </Ribbon>
  </Link>
);

export default TechCard;
