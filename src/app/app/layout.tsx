import { ReactNode } from 'react';
import AppSidebar from '@components/sidebar';

import '@app/global.css';
import 'prismjs/themes/prism-tomorrow.css';

import { Providers } from '@app/provider';
import { getSession } from '@lib/auth';

export default async function Layout({ children }: { children: ReactNode }) {

  const session = await getSession();

  return (
    <html>
      <head>
        <title>My Next.js Site</title>
      </head>
      <body>
        <Providers>
          <div className="flex h-screen w-screen bg-gray-100 dark:bg-neutral-900">
            <AppSidebar session={session}/>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
