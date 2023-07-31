'use client';

import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session?.user]);

  return (
    <div className='flex justify-center'>
      <section className='bg-white px-12 py-12 rounded-2xl sm:shadow-2xl'>
        <Image src='/vercel.svg' height={120} width={120} alt='login-logo' />
        <h1 className='text-2xl text-blue-600 font-bold my-6'>Sign in to your account</h1>
        <Form layout='vertical'>
          <FormItem label='Username'>
            <Input placeholder='name@comapny.com' disabled />
          </FormItem>
          <FormItem label='Password'>
            <Input value='password' type='password' disabled />
          </FormItem>
          <FormItem noStyle>
            <Checkbox type='checkbox' disabled>
              Remember me
            </Checkbox>
          </FormItem>
          <Button type='primary' htmlType='submit' className='w-full mt-8' disabled>
            Sign in
          </Button>
          <div className='mt-8'>
            <Divider>
              <span className='text-sm'>Or continue with</span>
            </Divider>
          </div>
          <Button className='w-full mt-8' onClick={() => signIn('google')} icon={<GoogleOutlined />}>
            Google
          </Button>
          <Button className='w-full mt-4' onClick={() => signIn('github')} icon={<GithubOutlined />}>
            Github
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default LoginPage;
