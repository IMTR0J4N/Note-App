export interface MarkdownParserClasses {
  container?: string;
  p?: string;
  pre?: string;
  code?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  hr?: string;
  blockquote?: string;
  ol?: string;
  ul?: string;
  li?: string;
  a?: string;
  img?: string;
  strong?: string;
  em?: string;
  del?: string;
  inlineCode?: string;
}

export interface MarkdownParserProps {
  markdown: string;
  classes?: MarkdownParserClasses;
}