export interface ChatSession {
  id: string;
  visitor_id: string;
  visitor_name?: string;
  visitor_email?: string;
  status: 'open' | 'in_progress' | 'closed';
  created_at: string;
  updated_at: string;
  last_message?: string;
  unread_count: number;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  content: string;
  sender: 'visitor' | 'admin';
  created_at: string;
  read: boolean;
}

export type ChatStatus = ChatSession['status'];
