import { ReactNode } from 'react';

import '@app/global.css';
import { Providers } from '@app/provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>My Next.js Site</title>
      </head>
      <body>
        <Providers>
          <main className="flex h-screen w-screen bg-gray-100 dark:bg-neutral-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
