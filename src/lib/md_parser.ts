// @ts-ignore
import { MarkdownParserClasses } from '@types/MarkdownParser';
import CodeBlock from '@components/CodeBlock';
import { createElement, ReactNode, JSX } from 'react';

/**
 * Fonction principale de parsing.
 * Elle commence par traiter le Markdown en blocs (block-level),
 * puis applique le parsing inline sur le contenu.
 */
export function parseMarkdown(
  markdown: string,
  classes: MarkdownParserClasses
): ReactNode[] {
  return parseBlocks(markdown, classes);
}

/**
 * parseBlocks :
 * Traite le Markdown ligne par ligne pour en extraire les éléments block-level.
 * Prend en charge :
 *  - Les blocs de code (fenced code avec ```),
 *  - Les titres (h1 à h6),
 *  - Les règles horizontales,
 *  - Les blockquotes (avec niveaux imbriqués),
 *  - Les listes (ordonnées et non ordonnées),
 *  - Les paragraphes.
 */
function parseBlocks(
  markdown: string,
  classes: MarkdownParserClasses
): ReactNode[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    let line = lines[i];

    // 1. Bloc de code (fenced code block)
    if (/^```/.test(line)) {
      let codeContent = '';
      const languageMatch = line.match(/^```(\w+)?/);
      const language = languageMatch ? languageMatch[1] : '';
      i++; // passe la ligne d'ouverture
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeContent += lines[i] + '\n';
        i++;
      }
      i++; // passe la ligne de fermeture

      blocks.push(
        createElement(CodeBlock, {
          key: keyCounter++,
          code: codeContent,
          language: language || '',
          preClassName: classes.pre ?? '',
          codeClassName: classes.code ?? '',
        })
      );
      continue;
    }

    // 2. Titres (h1 à h6)
    if (/^#{1,6}\s/.test(line)) {
      const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const content = parseInline(headerMatch[2], classes);
        const Tag = ('h' + level) as keyof JSX.IntrinsicElements;
        const className =
          classes[`h${level}` as keyof MarkdownParserClasses] ?? '';
        blocks.push(
          createElement(Tag, { key: keyCounter++, className }, content)
        );
        i++;
        continue;
      }
    }

    // 3. Règle horizontale
    if (/^(?:---|\*\*\*|___)\s*$/.test(line)) {
      blocks.push(
        createElement('hr', { key: keyCounter++, className: classes.hr ?? '' })
      );
      i++;
      continue;
    }

    // 4. Blockquote (gestion des niveaux multiples)
    if (/^>/.test(line)) {
      const quoteLines: { level: number; content: string }[] = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        const markerMatches = lines[i].match(/>/g);
        const level = markerMatches ? markerMatches.length : 0;
        const content = lines[i].replace(/^(?:>\s?)+/, '');
        quoteLines.push({ level, content });
        i++;
      }
      const keyObj = { current: keyCounter };
      const nestedQuote = buildNestedBlockquote(quoteLines, classes, keyObj);
      keyCounter = keyObj.current;
      blocks.push(nestedQuote);
      continue;
    }

    // 5. Listes (ordonnées et non ordonnées)
    if (/^\s*([-+*]|\d+\.)\s+/.test(line)) {
      const listLines: string[] = [];
      const isOrdered = /^\s*\d+\.\s+/.test(line);
      while (i < lines.length && /^\s*([-+*]|\d+\.)\s+/.test(lines[i])) {
        listLines.push(lines[i]);
        i++;
      }
      blocks.push(
        parseList(
          listLines.join('\n'),
          isOrdered ? 'ol' : 'ul',
          keyCounter++,
          classes
        )
      );
      continue;
    }

    // 6. Paragraphe (une ou plusieurs lignes non vides)
    if (line.trim() !== '') {
      const paraLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== '') {
        paraLines.push(lines[i]);
        i++;
      }
      blocks.push(
        createElement(
          'p',
          { key: keyCounter++, className: classes.p ?? '' },
          parseInline(paraLines.join(' '), classes)
        )
      );
      while (i < lines.length && lines[i].trim() === '') {
        i++;
      }
      continue;
    }

    // Ligne vide (on passe)
    i++;
  }

  return blocks;
}

/**
 * parseList :
 * Transforme un ensemble de lignes correspondant à une liste en
 * un élément <ul> ou <ol> contenant des <li> avec le contenu inline parsé.
 */
function parseList(
  text: string,
  type: 'ol' | 'ul',
  key: number,
  classes: MarkdownParserClasses
): ReactNode {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  const items = lines.map((line, index) => {
    const cleaned = line.replace(/^\s*([-+*]|\d+\.)\s+/, '');
    return createElement(
      'li',
      { key: index, className: classes.li ?? '' },
      parseInline(cleaned, classes)
    );
  });
  return type === 'ol'
    ? createElement('ol', { key, className: classes.ol ?? '' }, items)
    : createElement('ul', { key, className: classes.ul ?? '' }, items);
}

/**
 * parseInline :
 * Traite les éléments inline du Markdown (gras, italique, barré, code inline,
 * liens et images).
 */
function parseInline(
  text: string,
  classes: MarkdownParserClasses
): ReactNode[] {
  const result: ReactNode[] = [];
  const inlineRegex =
    /(\*\*\*([\s\S]+?)\*\*\*|\*\*([\s\S]+?)\*\*|\*([\s\S]+?)\*|~~([\s\S]+?)~~|`([\s\S]+?)`|!?(\[.*?\]\(.*?\)))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    const matchedStr = match[0];

    if (matchedStr.startsWith('***')) {
      result.push(
        createElement(
          'strong',
          { key: lastIndex, className: classes.strong ?? '' },
          createElement(
            'em',
            { className: classes.em ?? '' },
            parseInline(match[2], classes)
          )
        )
      );
    } else if (matchedStr.startsWith('**')) {
      result.push(
        createElement(
          'strong',
          { key: lastIndex, className: classes.strong ?? '' },
          parseInline(match[3], classes)
        )
      );
    } else if (matchedStr.startsWith('*')) {
      result.push(
        createElement(
          'em',
          { key: lastIndex, className: classes.em ?? '' },
          parseInline(match[4], classes)
        )
      );
    } else if (matchedStr.startsWith('~~')) {
      result.push(
        createElement(
          'del',
          { key: lastIndex, className: classes.del ?? '' },
          parseInline(match[5], classes)
        )
      );
    } else if (matchedStr.startsWith('`')) {
      result.push(
        createElement(
          'code',
          { key: lastIndex, className: classes.inlineCode ?? '' },
          match[6]
        )
      );
    } else if (match[7]) {
      const linkText = match[7];
      const linkRegex = /^(!?)\[(.*?)\]\((\S+?)(?:\s+"(.*?)")?\)$/;
      const linkMatch = linkText.match(linkRegex);
      if (linkMatch) {
        const isImage = linkMatch[1] === '!';
        const altOrText = linkMatch[2];
        const url = linkMatch[3];
        const title = linkMatch[4];
        if (isImage) {
          result.push(
            createElement('img', {
              key: lastIndex,
              src: url,
              alt: altOrText,
              title,
              className: classes.img ?? '',
            })
          );
        } else {
          result.push(
            createElement(
              'a',
              { key: lastIndex, href: url, title, className: classes.a ?? '' },
              parseInline(altOrText, classes)
            )
          );
        }
      }
    }
    lastIndex = inlineRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result;
}

/**
 * buildNestedBlockquote
 *
 * Construit une structure imbriquée de blockquotes à partir d'un tableau
 * de lignes avec leur niveau (déterminé par le nombre de '>' en début de ligne)
 * en utilisant une pile pour gérer les niveaux.
 */
function buildNestedBlockquote(
  quoteLines: { level: number; content: string }[],
  classes: MarkdownParserClasses,
  keyCounter: { current: number }
): ReactNode {
  const stack: ReactNode[][] = [];
  stack.push([]);
  for (const line of quoteLines) {
    while (stack.length < line.level) {
      stack.push([]);
    }
    while (stack.length > line.level) {
      const content = stack.pop();
      const blockquoteElement = (
        createElement('blockquote', { key: keyCounter.current++, className: classes.blockquote ?? '' }, content)
      );
      stack[stack.length - 1].push(blockquoteElement);
    }
    if (line.content.trim() !== '') {
      stack[stack.length - 1].push(
        createElement('p', { key: keyCounter.current++, className: classes.p ?? '' }, parseInline(line.content, classes))
      );
    }
  }
  while (stack.length > 1) {
    const content = stack.pop();
    const blockquoteElement = (
        createElement('blockquote', { key: keyCounter.current++, className: classes.blockquote ?? '' }, content)
    );
    stack[stack.length - 1].push(blockquoteElement);
  }
  return (
    createElement('blockquote', { key: keyCounter.current++, className: classes.blockquote ?? '' }, stack[0])
  );
}
