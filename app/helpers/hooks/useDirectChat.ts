'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, CreateMessage } from '@ai-sdk/ui-utils';

type UseDirectChatOptions = {
  initialMessages?: Message[];
  onResponse?: (response: string) => void;
  onFinish?: () => void;
  onError?: (error: Error) => void;
  generateResponse: (messages: Message[], context?: any) => Promise<ReadableStream<Uint8Array>>;
};

export function useDirectChat({
  initialMessages = [],
  onResponse,
  onFinish,
  onError,
  generateResponse,
}: UseDirectChatOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | Error>();
  const [status, setStatus] = useState<'ready' | 'streaming' | 'error'>('ready');
  const abortControllerRef = useRef<AbortController | null>(null);

  const append = useCallback(
    async (message: Message | CreateMessage, context?: any) => {
      try {
        setIsLoading(true);
        setStatus('streaming');
        setError(undefined);

        const userMessage: Message = {
          id: Math.random().toString(36).substring(7),
          content: typeof message === 'string' ? message : message.content,
          role: 'user',
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        abortControllerRef.current = new AbortController();

        const stream = await generateResponse(newMessages, context);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let accumulatedResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          accumulatedResponse += chunk;
          onResponse?.(chunk);

          setMessages(current => {
            const updated = [...current];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage?.role === 'assistant') {
              lastMessage.content = accumulatedResponse;
            } else {
              updated.push({
                id: Math.random().toString(36).substring(7),
                content: accumulatedResponse,
                role: 'assistant',
              });
            }
            return updated;
          });
        }

        setStatus('ready');
        onFinish?.();
        return accumulatedResponse;

      } catch (err) {
        const error = err as Error;
        setError(error);
        setStatus('error');
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, generateResponse, onResponse, onFinish, onError]
  );

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const reload = useCallback(
    async (context?: any) => {
      if (messages.length === 0) return null;

      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const messageToReload = messages[messages.length - 2];
        return append(messageToReload, context);
      }

      return append(lastMessage, context);
    },
    [messages, append]
  );

  const handleSubmit = useCallback(
    async (e?: { preventDefault: () => void }, context?: any) => {
      e?.preventDefault();

      if (!input.trim()) return;

      const userMessage: CreateMessage = {
        content: input,
        role: 'user',
      };

      setInput('');
      await append(userMessage, context);
    },
    [input, append]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    messages,
    append,
    reload,
    stop,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    status,
    setMessages,
  };
}