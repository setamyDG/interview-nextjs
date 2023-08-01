'use client';

import { Empty } from 'antd';

const NoData = (): JSX.Element => (
  <div className='flex justify-center items-center flex-col'>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </div>
);

export default NoData;
