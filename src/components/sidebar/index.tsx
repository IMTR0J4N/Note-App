'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { SidebarProvider } from '@components/sidebar/SidebarProvider';
import { SidebarBody } from '@components/sidebar/SidebarBody';
import { SidebarLink } from '@components/sidebar/SidebarLink';
import { navbarItems } from '@utils/constants';

import { HiUser } from 'react-icons/hi';
import { Session } from 'next-auth';

const AppSidebar = ({ session }: { session: Session  | null}) => {
  
  const isAuthenticated = !!session;

  return (
    <SidebarProvider>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {navbarItems.map((link, idx) => {
              console.log(link.label, link.hideWhenAuthenticated);
              if (link.hideWhenAuthenticated && isAuthenticated) {
                return null;
              }

              return (
                <SidebarLink
                  key={idx}
                  label={link.label}
                  redirectTo={link.redirectTo}
                  icon={link.icon}
                />
              );
            })}
          </div>
        </div>
        {isAuthenticated && (
          <div>
            <SidebarLink
              label={session.user.name!}
              redirectTo={'#'}
              icon={
                <HiUser />
              }
            />
          </div>
        )}
      </SidebarBody>
    </SidebarProvider>
  );
};

const Logo: React.FC = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Modern Blog
      </motion.span>
    </Link>
  );
};

export default AppSidebar;
