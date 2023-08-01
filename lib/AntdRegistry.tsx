'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import { Props } from './AntdRegistry.types';

const AntdRegistry = ({ children }: Props): JSX.Element => {
  const cache = createCache();
  useServerInsertedHTML(() => <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default AntdRegistry;
