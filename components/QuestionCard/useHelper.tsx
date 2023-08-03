import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';

type Result = {
  items: (onDelete: () => void, editUrl: string) => MenuProps['items'];
  questionDate: string;
};

export const useHelper = (createdAt: string): Result => {
  const items = (onDelete: () => void, editUrl: string) => [
    {
      key: '1',
      label: (
        <Link className='flex items-center' href={editUrl}>
          <EditTwoTone className='mr-2' />
          <p>Edit</p>
        </Link>
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

  const questionDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    items,
    questionDate,
  };
};
