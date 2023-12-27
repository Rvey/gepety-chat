import { Fragment } from 'react';
import type { ReactNode } from 'react';

interface IChatContent {
  text: (string | JSX.Element)[];
  children?: ReactNode;
  role: string;
}

export const ChatContent = ({ text, children , role }: IChatContent) => {
  return (
    <div className={`response__content-box ${role === 'user' ? 'response__content-box--user' : 'response__content-box--bot'}`}>
      <pre className="response__text">
        {text.map((content, index) => (
          <Fragment key={index}>{content}</Fragment>
        ))}
      </pre>
      {children}
    </div>
  );
};
