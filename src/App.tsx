import React, { Fragment } from 'react';
import { ChatContent } from './components/ChatContent';
import { ChatForm } from './components/ChatForm';
import { Role } from './components/Role';
import { useOpenAIChatStream } from './hooks/useOpenAIChatStream';
import { getFormattedText } from './utils/utils';
import './App.css';
// eslint-disable-next-line import/order
import Navbar from '@/components/NavBar';
// eslint-disable-next-line import/order
import AutoScroll from '@brianmcallister/react-auto-scroll';

export const App = () => {
  // V1 Response Streaming with Context Memory
  const { messages, submitPrompt, resetMessages, isLoading, abortStream, regenerateResponse } = useOpenAIChatStream({
    model: 'gpt-4-1106-preview',
    apiKey: import.meta.env.VITE_OPEN_AI_KEY
  });

  const [selectedAgent, setSelectedAgent] = React.useState({
    agent: '',
    prompt: ''
  });

  return (
    <>
      <AutoScroll
        // height={900}
      >
      <main className="app">
        {/*<Navbar selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} resetMessages={resetMessages} />*/}

        <div className="response">
          {messages.length > 0 &&
            messages.map(({ role, content }, index) => {
              if (index === 0 && selectedAgent.prompt !== '') return null;
              return (
                <Fragment key={index}>
                  <Role role={role} />
                  <ChatContent text={getFormattedText(content)} role={role} />
                </Fragment>
              );
            })}
        </div>
      </main>
      </AutoScroll>

      <ChatForm onSubmit={submitPrompt} onReset={regenerateResponse} isLoading={isLoading} selectedAgent={selectedAgent} resetMessages={resetMessages} />
      <button className={`button button--abort ${isLoading ? 'active' : ''}`} onClick={abortStream}>
        Abort
      </button>
    </>

  );
};
