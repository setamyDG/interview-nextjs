import { MenuOutlined } from '@ant-design/icons';
import { truncateString } from '@utils/truncateString';
import { Divider, Dropdown } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Props } from './QuestionCard.types';
import { useHelper } from './useHelper';

const QuestionCard = ({ question, onDelete, actionsVisible }: Props): JSX.Element => {
  const { items, questionDate } = useHelper(question.createdAt);

  return (
    <div className='relative border border-gray-200 flex flex-col hover:border-gray-300 ease-in duration-100 hover:shadow-lg rounded-2xl'>
      <div className='px-4 py-4'>
        <span className='text-xs text-gray-400 flex-start mb-2'>{questionDate}</span>
        <div className=''>
          <p className='break-words font-semibold h-16 my-4'>{truncateString(question.question, 130)}</p>
          {actionsVisible && (
            <Dropdown
              menu={{
                items: items(onDelete, `${question.techType}/${question.id}/edit`),
              }}
            >
              <MenuOutlined className='absolute top-4 right-3 bg-white' />
            </Dropdown>
          )}
        </div>
        <p className='text-xs text-gray-300 mb-12'>{truncateString(question.answer, 200)}</p>
        <Link
          href={`${question.techType}/${question.id}`}
          className='border flex items-center justify-center rounded bg-blue-600 text-white text-sm py-2 mt-4 hover:bg-blue-700 cursor-pointer'
        >
          See more
        </Link>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className='flex gap-3 md:gap-5 py-3 px-4 hover:bg-gray-50 hover:rounded-bl-2xl hover:rounded-br-2xl'>
        <Image src={question.authorAvatar} height={50} width={50} alt='logo' className='rounded-full' />
        <div className='flex flex-col justify-center'>
          <span className='text-sm'>{question.authorName}</span>
          <span className='text-xs text-gray-400'>{question.authorEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
