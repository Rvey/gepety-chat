import type { ReactNode } from 'react';

interface IChat {
  isEmpty: boolean;
  children: ReactNode;
}

export const ChatResponseLayout = ({ isEmpty, children }: IChat) => {
  return (
    <section className="response">
      {isEmpty && <div>
        <img src="https://images.gamebanana.com/img/ico/sprays/63e644c84b6d6.png" alt="robot" style={{
          width: '200px',
          height: '200px',
          display: 'block',
          margin: '0 auto',
          marginTop: '20px',
          marginBottom: '20px'
        }} />
      </div>}
      {children}
    </section>
  );
};
