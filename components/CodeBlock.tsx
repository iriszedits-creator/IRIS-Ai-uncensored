
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 border border-zinc-800 rounded-xl overflow-hidden bg-[#050505] shadow-2xl group transition-all hover:border-[#af0000]/30">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#af0000]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="ml-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mono">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 text-[10px] font-bold transition-all rounded-md mono uppercase flex items-center gap-2 ${
            copied 
              ? 'text-green-500 bg-green-500/10 border border-green-500/20' 
              : 'text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-[#af0000] border border-zinc-700 hover:border-[#af0000]'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-5 overflow-x-auto custom-scrollbar">
        <pre className="mono text-[13px] text-zinc-300 leading-relaxed whitespace-pre font-medium">
          <code>{code.trim()}</code>
        </pre>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#af0000]/5 blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CodeBlock;
