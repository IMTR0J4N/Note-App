'use client';

import { Tabs } from '@components/AnimatedTabs';
import MarkdownParser from '@components/MarkdownParser';
import { NoteArea } from '@components/NoteArea';
// @ts-ignore
import { Tab } from '@types/AnimatedTab';
import { markdownInterpreterClasses } from '@utils/constants';
import { useState } from 'react';

import { HiCode } from 'react-icons/hi';

export default function DashboardPage() {
  const [text, setText] = useState<string>('');

  const tabs: Tab[] = [
    {
      title: 'Notes',
      value: 'notes',
      content: (
        <div className="flex flex-col items-center justify-center w-full h-auto px-4 py-5 rounded-lg bg-neutral-800">
          <NoteArea value={text} valueSetter={setText} />
          <div className="w-full border-t border-neutral-700 my-4"></div>
          <div className="w-full flex py-2 px-2 justify-between items-center">
            <div className='flex items-center gap-2'>
              <HiCode className="text-neutral-500 dark:text-neutral-400 h-5 w-5 cursor-pointer hover:dark:text-neutral-200 hover:text-neutral-300" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Save
            </button>
          </div>
        </div>
      ),
    },
    {
      title: 'Preview',
      value: 'preview',
      content: (
        <div className="flex items-center w-full h-auto px-4 py-5 rounded-lg bg-neutral-800">
          <MarkdownParser
            markdown={text}
            classes={markdownInterpreterClasses}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 h-full w-full flex items-center justify-center">
      <div className="h-full w-full pt-10 max-w-2xl flex flex-col items-center justify-start">
        <div className="h-fit w-full p-5 flex justify-center items-center">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
