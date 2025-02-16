// MarkdownParser.tsx
'use client';

// @ts-ignore
import { MarkdownParserProps } from '@types/MarkdownParser';
import { parseMarkdown } from '@lib/md_parser';

const MarkdownParser = ({ markdown, classes = {} }: MarkdownParserProps) => {
  const content = parseMarkdown(markdown, classes);
  return markdown.length > 0 ? <div className='text-white'>{content}</div> : <div className='w-full flex items-center justify-center'> <h2 className='text-white text-lg'>Aucun contenu disponible</h2> </div>;
};

export default MarkdownParser;