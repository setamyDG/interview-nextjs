import { MenuOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Question } from '@customTypes/question';
import { truncateString } from '@utils/truncateString';
import { Divider, Dropdown } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Props = {
  question: Question;
  onDelete: () => void;
  onEdit: () => void;
  actionsVisible: boolean;
};

const items = (onDelete: () => void, onEdit: () => void) => [
  {
    key: '1',
    label: (
      <div className='flex items-center' onClick={onEdit}>
        <EditTwoTone className='mr-2' />
        <p>Edit</p>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className='flex items-center' onClick={onDelete}>
        <DeleteTwoTone className='mr-2' />
        <p>Delete</p>
      </div>
    ),
  },
];

const QuestionCard = ({ question, onDelete, onEdit, actionsVisible }: Props) => {
  const { data: session } = useSession();

  const qDate = new Date(question.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='relative border border-gray-200 flex flex-col hover:border-gray-300 ease-in duration-100 hover:shadow-lg rounded-2xl'>
      <div className='px-4 py-4'>
        <span className='text-xs text-gray-400 flex-start mb-2'>{qDate}</span>
        <div className=''>
          <p className='break-words font-semibold h-16 my-4'>{truncateString(question.question, 130)}</p>
          {actionsVisible && (
            <Dropdown
              menu={{
                items: items(onDelete, onEdit),
              }}
            >
              <MenuOutlined className='absolute top-4 right-3 bg-white' />
            </Dropdown>
          )}
        </div>
        <p className='text-xs text-gray-300 mb-12'>{truncateString(question.answer, 200)}</p>
        <div className='border flex items-center justify-center rounded bg-blue-600 text-white text-sm py-2 mt-4 hover:bg-blue-700 cursor-pointer'>
          <Link href={`${question.techType}/${question.id}`}>See more</Link>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
      <Link
        href={session?.user?.email === question.authorEmail ? '/profile' : `/profile/${session?.user?.id}`}
        className='flex gap-3 md:gap-5 py-3 px-4 hover:bg-gray-50 hover:rounded-bl-2xl hover:rounded-br-2xl cursor-pointer'
      >
        <Image src={question.authorAvatar} height={50} width={50} alt='logo' className='rounded-full' />
        <div className='flex flex-col justify-center'>
          <span className='text-sm'>{question.authorName}</span>
          <span className='text-xs text-gray-400'>{question.authorEmail}</span>
        </div>
      </Link>
    </div>
  );
};

export default QuestionCard;
