
import React from 'react';
import { Message } from '../types';
import CodeBlock from './CodeBlock';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
        const lang = match?.[1] || 'code';
        const code = match?.[2] || '';
        return <CodeBlock key={index} code={code} language={lang} />;
      }
      
      const formattedPart = part.split(/(\*\*.*?\*\*|### .*?\n)/g).map((sub, i) => {
        if (sub.startsWith('### ')) {
          return <h3 key={i} className="text-[#af0000] font-black text-xl mt-8 mb-4 mono tracking-tighter border-l-4 border-[#af0000] pl-4 bg-[#af0000]/5 py-2 uppercase italic">{sub.replace('### ', '').trim()}</h3>;
        }
        if (sub.startsWith('**') && sub.endsWith('**')) {
          return <strong key={i} className="text-[#cc0000] font-black">{sub.replace(/\*\*/g, '')}</strong>;
        }
        return sub;
      });

      return (
        <div key={index} className="text-zinc-300 leading-loose text-[15px] mb-6 font-medium">
          {formattedPart}
        </div>
      );
    });
  };

  return (
    <div className={`flex gap-6 sm:gap-10 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out`}>
      <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-500 ${
        isAssistant 
          ? 'bg-black border-[#af0000] shadow-[0_0_30px_rgba(175,0,0,0.25)] ring-2 ring-[#af0000]/10' 
          : 'bg-zinc-900 border-zinc-800'
      }`}>
         <span className={`text-[13px] font-black mono ${isAssistant ? 'text-[#af0000]' : 'text-zinc-600'}`}>
           {isAssistant ? 'IR' : 'USR'}
         </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-4">
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] mono ${isAssistant ? 'text-[#af0000]' : 'text-zinc-600'}`}>
            {isAssistant ? 'IRIS_INTELLIGENCE' : 'CLIENT_INPUT'}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-900 to-transparent opacity-20" />
        </div>
        <div className="prose prose-invert max-w-none">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
