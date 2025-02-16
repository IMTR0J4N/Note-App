'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function NoteArea({ value, valueSetter }: { value: string, valueSetter: Dispatch<SetStateAction<string>> }) {
  // Fonction pour ajuster la hauteur du textarea
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { target: textarea } = e;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    valueSetter(textarea.value);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      className="w-full resize-none overflow-hidden text-white outline-none"
      value={value}
      onInput={handleInputChange}
      placeholder="Écris ton texte ici..."
      rows={1}
      style={{ minHeight: '24px' }}
      ref={(textarea) => {
        if (textarea) {
          adjustTextareaHeight(textarea);
        }
      }}
    />
  );
}
