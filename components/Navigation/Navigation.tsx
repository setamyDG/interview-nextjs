'use client';

import { LogoutOutlined, RightCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { routes } from '@const/routes';
import { Button, Divider, Drawer } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const Navigation = (): JSX.Element => {
  const [api, contextHolder] = useNotification();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleClick = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const openNotification = () => {
    api.open({
      message: 'Discover the captivating world of our latest blog post!  🧠',
      description: `Unveil fascinating insights, expert tips, and valuable knowledge that will enrich your understanding of cutting-edge technologies and industry trends. Join us on this journey as we explore groundbreaking concepts, share innovative ideas, and showcase the possibilities of tomorrow`,
      duration: 0,
      type: 'info',
      placement: 'topLeft',
      btn: <Button>Visit Blog</Button>,
      style: {
        top: 40,
      },
    });
  };

  return (
    <div className='sticky w-full'>
      {contextHolder}
      <nav className='border-b border-gray-200 py-2 px-8 sm:px-16 flex justify-between'>
        <div className='flex items-center'>
          <div className='notification_trigger mr-5 text-lg flex items-center'>
            <RightCircleOutlined onClick={openNotification} />
          </div>
          <Link href={routes.overview}>
            <Image src='/crown.svg' width={40} height={40} alt='logo' />
          </Link>
          <Divider type='vertical' style={{ height: 32, marginTop: 2 }} />
        </div>
        {/* DESKTOP */}
        <div className='sm:flex hidden items-center'>
          <div className='flex gap-3 md:gap-8 items-center text-sm'>
            <Link
              className={pathname === routes.overview ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}
              href={routes.overview}
            >
              Overview
            </Link>
            {session?.user ? (
              <>
                <Link
                  className={
                    pathname === routes.profile ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                  }
                  href={routes.profile}
                >
                  Profile
                </Link>
                <LogoutOutlined
                  onClick={() =>
                    signOut({
                      callbackUrl: routes.signUp,
                    })
                  }
                  className='hover:cursor-pointer mr-2'
                />
                <div className='flex justify-center items-center'>
                  <Image
                    className='rounded-full'
                    src={session?.user.image as string}
                    width={35}
                    height={35}
                    alt='user-logo'
                  />
                  <div className='flex flex-col ml-4'>
                    <span className='font-semibold'>{session?.user.name}</span>
                    <span className='text-xs text-gray-400'>{session?.user.email}</span>
                  </div>
                </div>
              </>
            ) : (
              <Link href={routes.signUp} className='bg-blue-600 text-white rounded px-5 py-1 hover:bg-blue-700'>
                Login
              </Link>
            )}
          </div>
        </div>
        {/* MOBILE */}
        <div className='sm:hidden flex items-center'>
          <MenuOutlined onClick={handleClick} />
        </div>
        <Drawer
          width={300}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={
            <>
              {session?.user ? (
                <div className='flex justify-center items-center'>
                  <Image
                    className='rounded-full'
                    src={session?.user.image as string}
                    width={35}
                    height={35}
                    alt='user-logo'
                  />
                  <div className='flex flex-col ml-4'>
                    <span className='font-semibold'>{session?.user.name}</span>
                    <span className='text-xs text-gray-400'>{session?.user.email}</span>
                  </div>
                </div>
              ) : (
                <Link href={routes.signUp} className='bg-blue-600 text-white rounded px-5 py-1 hover:bg-blue-700'>
                  Login
                </Link>
              )}
            </>
          }
        >
          <div className='flex flex-col gap-4'>
            <Link
              onClick={() => setIsOpen(false)}
              className={pathname === routes.overview ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}
              href={routes.overview}
            >
              Overview
            </Link>
            {session?.user ? (
              <>
                <Link
                  className={
                    pathname === routes.profile ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                  }
                  href={routes.profile}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <LogoutOutlined
                  onClick={() =>
                    signOut({
                      callbackUrl: routes.signUp,
                    })
                  }
                  className='hover:cursor-pointer mt-16 sm:mr-2'
                />
              </>
            ) : (
              <Link href={routes.signUp} className='bg-blue-600 text-white rounded px-5 py-1 hover:bg-blue-700'>
                Login
              </Link>
            )}
          </div>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navigation;
