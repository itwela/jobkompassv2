'use server';

import { deepseek } from '@/app/helpers/clients/deeepseekClient';
import { generateText } from 'ai';

export const chatWithAI = async (messages: any[], context: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, context }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate chat response');
  }

  return response;
};

