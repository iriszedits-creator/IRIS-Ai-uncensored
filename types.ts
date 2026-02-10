
export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export enum SupportedLanguages {
  PYTHON = 'python',
  CPP = 'cpp',
  C = 'c',
  CSS = 'css',
  JAVASCRIPT = 'javascript',
  JAVA = 'java',
  CSHARP = 'csharp',
  GO = 'go',
  SWIFT = 'swift',
  SQL = 'sql'
}
