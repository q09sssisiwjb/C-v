import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Message {
  id: string;
  type: 'welcome' | 'info' | 'notification' | 'admin';
  title: string;
  content: string;
  timestamp?: Date;
  createdAt?: Date;
  isRead: boolean;
  senderAdminEmail?: string | null;
  recipientUserId: string;
}

export function useUserMessages(options?: { refetchInterval?: number }) {
  const { data: messages = [], isLoading, refetch, error } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
    enabled: false,
    refetchInterval: options?.refetchInterval || 30000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return [];
    },
  });

  const unreadCount = useMemo(() => {
    return messages.filter(msg => !msg.isRead).length;
  }, [messages]);

  const unreadMessages = useMemo(() => {
    return messages.filter(msg => !msg.isRead);
  }, [messages]);

  const unreadAdminMessages = useMemo(() => {
    return messages.filter(msg => !msg.isRead && msg.type === 'admin');
  }, [messages]);

  return {
    messages,
    unreadCount,
    unreadMessages,
    unreadAdminMessages,
    isLoading,
    refetch,
    error,
  };
}
