'use client';

import Ribbon from 'antd/es/badge/Ribbon';
import Image from 'next/image';
import Link from 'next/link';

export type TechCardType = {
  title: string;
  type: string;
  avatar: string;
  href: string;
};

type Props = {
  techCard: TechCardType;
  questionCount?: number;
};

const TechCard = ({ techCard, questionCount }: Props) => {
  return (
    <>
      <Link href={techCard.href}>
        <Ribbon text={`Questions: ${questionCount}`}>
          <div className='border border-gray-200 py-16 flex justify-center items-center hover:border-gray-300 ease-in duration-100 hover:shadow-lg'>
            <Image height={140} width={140} alt={techCard.title} src={techCard.avatar} />
          </div>
        </Ribbon>
      </Link>
    </>
  );
};

export default TechCard;
