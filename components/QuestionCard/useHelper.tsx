import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type Result = {
  items: (onDelete: () => void, onEdit: () => void) => MenuProps['items'];
  questionDate: string;
};

export const useHelper = (createdAt: string): Result => {
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
