"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

type Props = {
  text: string;
};

const components: Components = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 text-blue-500"
    />
  ),

  p: ({ node, ...props }) => (
    <p className="mb-3 leading-relaxed" {...props} />
  ),

  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside space-y-2 mb-4" {...props} />
  ),

  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />
  ),

  li: ({ node, ...props }) => (
    <li className="ml-2" {...props} />
  ),

  h1: ({ node, ...props }) => (
    <h1 className="text-2xl font-bold mb-4" {...props} />
  ),

  h2: ({ node, ...props }) => (
    <h2 className="text-xl font-semibold mb-3" {...props} />
  ),

  h3: ({ node, ...props }) => (
    <h3 className="text-lg font-semibold mb-2" {...props} />
  ),

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic mb-4"
      {...props}
    />
  ),

  code: (({ node, className, children, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="bg-gray-200 px-1 py-0.5 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  }) as Components["code"],
};

export const ConvertMarkdownToText = memo(function MarkdownBubble({
  text,
}: Props) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {text}
    </ReactMarkdown>
  );
});