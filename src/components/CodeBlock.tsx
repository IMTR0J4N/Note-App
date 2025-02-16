// components/CodeBlock.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { highlightElement } from 'prismjs';
import { HiClipboardCheck, HiClipboardCopy } from 'react-icons/hi';
// @ts-ignore
import { CodeBlockProps } from '@types/CodeBlock';

const CodeBlock = ({
  code,
  language = '',
  preClassName = '',
  codeClassName = '',
}: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (codeRef.current) {
      highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <pre className={`${preClassName} !p-0`}>
      <div className="h-fit w-full py-0.5 px-3 bg-neutral-600 flex justify-between items-center">
        <span>{language}</span>
        {isCopied ? (
          <HiClipboardCheck className="text-xl text-green-500" />
        ) : (
          <HiClipboardCopy
            className="cursor-pointer text-xl text-neutral-300 hover:text-neutral-100"
            onClick={handleCopy}
          />
        )}
      </div>
      <code ref={codeRef} className={`language-${language} ${codeClassName}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
