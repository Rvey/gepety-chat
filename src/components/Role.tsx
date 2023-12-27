import { BugAntIcon, UserIcon } from '@heroicons/react/16/solid';
import type { ChatRole } from '@/hooks/useOpenAIChatStream';
import { Bot, User } from 'lucide-react';

interface IRole {
  role: ChatRole;
}

export const Role = ({ role }: IRole) => {
  return (
    <div className="response__role">
      <span className="response__sticky">{role === ('assistant' || 'system') ? <Bot className="toggle_icon" /> : <User className="toggle_icon" />}</span>
    </div>
  );
};
