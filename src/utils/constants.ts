import { NextAuthOptions } from 'next-auth';
import { createElement } from 'react';
import { HiHome, HiLogin } from 'react-icons/hi';

import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { verifyPassword } from '@lib/auth';

// @ts-ignore
import { MarkdownParserClasses } from '@types/MarkdownParser';

export const navbarItems = [
  {
    label: 'Home',
    redirectTo: '/',
    icon: createElement(HiHome, {
      className: 'text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0',
    }),
    hideWhenAuthenticated: false,
  },
  {
    label: 'Connexion',
    redirectTo: '/auth',
    icon: createElement(HiLogin, {
      className: 'text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0',
    }),
    hideWhenAuthenticated: true,
  },
];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await verifyPassword(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const markdownInterpreterRegex = /(^\|(?<tableSeparator>[\s\-|]+)\|\n)|(^\|\s*(?<tableTopFirst>[^|]+)(?=.*\n\|\s*-))|((?<!^)\|(?<tableTopMiddle>[^|\n]+)(?=\|.*\|\n\| -))|(\|(?<tableTopLast>[^|]+)\|\n(?=\|\s*-))|(^\|\s*(?<tableBottomFirst>[^|]+)(?=.*\n^[^|]))|((?<!^)\|(?<tableBottomMiddle>[^|\n]+)(?=\|.*\|\n[^|]))|(\|\s*(?<tableBottomLast>[^|]+)\|\n(?!\|))|(^\|\s*(?<tableMiddleFirst>[^|]+)(?=\|))|(\|\s*(?<tableMiddleLast>[^|]+)\|\n)|(\|\s*(?<tableMiddleMiddle>[^|]+))|!?(\[(?<text>[^(]+)]\((?<url>[^")]+))("(?<title>[^"]+)"|.*)\)|((?<!-.+\n)- (?<unorderedListFirstItem>.+)\n)|((?<=-.+\n)- (?<unorderedListMiddleItem>.+)\n(?=-))|(- (?<unorderedListLastItem>.+)\n(?!-))|((?<!\d+\..+\n)\d+\. (?<orderedListFirstItem>.+)\n)|((?<=\d+\..+\n)\d+\. (?<orderedListMiddleItem>.+)\n(?=\d+\.))|(\d+\. (?<orderedListLastItem>.+)\n(?!\d+\.))|(\*\*\*(?<boldAndItalic>[^*]*)\*\*\*)|(\*\*(?<bold>[^*]*)\*\*)|(\*(?<italic>[^*]*)\*)|(~~(?<strikethrough>[^~]*)~~)|(`{3}\n(?<multilineCode>[^`]+)`{3}\n)|(`(?<inlineCode>[^`\n]*)`)|(^#{6} (?<h6>.+))|(^#{5} (?<h5>.+))|(^#{4} (?<h4>.+))|(^#{3} (?<h3>.+))|(^#{2} (?<h2>.+))|(^# (?<h1>.+))|(?<horizontalLine>^-{3}\n)|(?<=^\n)> (?<singleLineQuote>.+)\n(?!^>)|((?<!> .+\n)> (?<quoteFirst>.+))|(> (?<quoteLast>.+)(?!.*\n> .+))|(> (?<quoteMiddle>.+))|(?<lineBreak>\n{2})/gm

export const markdownInterpreterClasses: MarkdownParserClasses = {
  container: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl *:text-white w-full',
  p: 'my-4',
  pre: 'border-[0.5px] border-s-4 border-neutral-400 bg-neutral-700 text-white rounded-md overflow-x-auto flex flex-col',
  code: 'px-3 py-2 rounded',
  h1: 'text-3xl font-bold my-4',
  h2: 'text-2xl font-bold my-4',
  h3: 'text-xl font-bold my-4',
  h4: 'text-lg font-bold my-4',
  h5: 'text-base font-bold my-4',
  h6: 'text-sm font-bold my-4',
  hr: 'border-t-2 border-gray-300 my-4',
  blockquote: 'p-4 my-4 border-[0.5px] border-s-4 border-neutral-400 bg-neutral-700 dark:border-neutral-500 dark:bg-neutral-700 rounded',
  ol: 'list-decimal list-inside my-4',
  ul: 'list-disc list-inside my-4',
  li: 'my-2',
  a: 'text-blue-600 hover:underline',
  img: 'max-w-full h-auto',
  strong: 'font-bold',
  em: 'italic',
  del: 'line-through',
  inlineCode: 'bg-gray-200 px-1 rounded text-black',
};