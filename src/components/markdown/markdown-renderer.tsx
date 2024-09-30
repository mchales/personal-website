import type { ReactNode } from 'react';

import remarkGfm from 'remark-gfm';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rangeParser from 'parse-numeric-range';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';

// Import MUI components
import { Box, Button, Typography } from '@mui/material';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

const syntaxTheme = prism;

// Define the CodeComponent
const CodeComponent = ({
  node,
  inline,
  className,
  ...props
}: {
  node: { data: { meta: string } };
  inline: boolean;
  className: string;
} & Record<string, unknown>): ReactNode => {
  const [isCopied, setIsCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || '');
  const hasMeta = node?.data?.meta;

  const applyHighlights: object = (lineNumber: number) => {
    if (hasMeta) {
      const RE = /{([\d,-]+)}/;
      const metadata = node.data.meta?.replace(/\s/g, '');
      const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)![1] : '0';
      const highlightLines = rangeParser(strlineNumbers);
      if (highlightLines.includes(lineNumber)) {
        return { className: 'highlight' };
      }
    }
    return {};
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(children.toString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500); // Reset copy state after 1.5 seconds
  };

  const children =
    typeof props.children === 'string' || Array.isArray(props.children) ? props.children : '';

  return match ? (
    <Box className="code-block-wrapper" sx={{ position: 'relative', marginBottom: 2 }}>
      <SyntaxHighlighter
        style={syntaxTheme}
        language={match[1]}
        PreTag="div"
        className="codeStyle"
        showLineNumbers={false} // Disable line numbers
        wrapLines={!!hasMeta}
        useInlineStyles
        lineProps={applyHighlights}
        customStyle={{
          paddingTop: '40px',
          paddingBottom: '30px',
        }}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <Button size="small" variant="outlined" onClick={handleCopy}>
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {match[1]}
        </Typography>
      </Box>
    </Box>
  ) : (
    <code className={className} {...props} />
  );
};

// Assign the CodeComponent to the code property
const MarkdownComponents: object = {
  code: CodeComponent,
};

type Props = {
  content: string;
};

const MarkdownRenderer: React.FC<Props> = ({ content }) => (
  <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;
