import { BugAntIcon, UserIcon } from '@heroicons/react/16/solid';
import type { ChatRole } from '@/hooks/useOpenAIChatStream';

interface IRole {
  role: ChatRole;
}

export const Role = ({ role }: IRole) => {
  return (
    <div className="response__role">
      <span className="response__sticky">{role === ('assistant' || 'system') ? <BugAntIcon className="toggle_icon" /> : <UserIcon className="toggle_icon" />}</span>
    </div>
  );
};
