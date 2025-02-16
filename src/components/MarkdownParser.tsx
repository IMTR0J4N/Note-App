// MarkdownParser.tsx
'use client';

// @ts-ignore
import { MarkdownParserProps } from '@types/MarkdownParser';
import { parseMarkdown } from '@lib/md_parser';

const MarkdownParser = ({ markdown, classes = {} }: MarkdownParserProps) => {
  const content = parseMarkdown(markdown, classes);
  return <div className={`${classes.container ?? ''}`}>{content}</div>;
};

export default MarkdownParser;