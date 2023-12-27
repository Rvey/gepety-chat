import React, { Fragment } from 'react';
import { ChatContent } from './components/ChatContent';
import { ChatForm } from './components/ChatForm';
import { ChatMetaData } from './components/ChatMetaData';
import { ChatResponseLayout } from './components/ChatResponseLayout';
import { Role } from './components/Role';
import { useOpenAIChatStream } from './hooks/useOpenAIChatStream';
import { getFormattedText } from './utils/utils';
import './App.css';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Bars3BottomLeftIcon, CpuChipIcon, TrashIcon } from '@heroicons/react/16/solid';

export const App = () => {
  // V1 Response Streaming with Context Memory
  const { messages, submitPrompt, resetMessages, isLoading, abortStream } = useOpenAIChatStream({
    model: 'gpt-4-1106-preview',
    apiKey: import.meta.env.VITE_OPEN_AI_KEY
  });

  const [toggle, setToggle] = React.useState(false);
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState({
    agent: '',
    prompt: ''
  });
  const [selectedRole, setSelectedRole] = React.useState<'system' | 'assistant'>('system');
  const [toggleDropdownRoles, setToggleDropdownRoles] = React.useState(false);
  const promptList = [
    {
      agent: 'tutor',
      prompt: 'You are a personal math tutor. Answer questions briefly, in a sentence or less.'
    },
    {
      agent: 'php senior developer',
      prompt: 'You are a senior PHP developer that is master of the symfony and api platform frameworks. You are a master of the backend and can build anything. and you can also help with optimization and scaling.'
    },
    {
      agent: 'agent 3',
      prompt: 'hello'
    }
  ];
  return (
    <div className="main">
      <div className="nav_bar">

        <Bars3BottomLeftIcon className="toggle_icon" onClick={() => setToggle(!toggle)} />
        {toggle && (
          <div className={`side_bar ${toggle ? 'side_bar__open' : ''}`}>
            <div className="side_bar__title">
              <h5>chat history</h5>
              <XMarkIcon className="toggle_icon" onClick={() => setToggle(!toggle)} />
            </div>
            <div className="side_bar__content">
              <div className="side_bar__content__item">
                chat 1
              </div>
            </div>
          </div>
        )}
        <div className="agent_seletor">
          <CpuChipIcon className="toggle_icon" onClick={() => {
            setToggleDropdown(!toggleDropdown);
            setToggleDropdownRoles(false);
          }} />
          <CpuChipIcon className="toggle_icon" onClick={() => {
            setToggleDropdownRoles(!toggleDropdownRoles);
            setToggleDropdown(false);
          }} />
          {selectedAgent.prompt !== '' && (
            <div className="selected_agent">
              <XMarkIcon className="toggle_icon" onClick={() => setSelectedAgent({
                agent: '',
                prompt: ''
              })} />
              <span>{selectedAgent.agent}</span>

            </div>
          )}
        </div>

        {toggleDropdown && (
          <div className={`dropdown ${toggleDropdown ? 'dropdown__open' : ''}`}>
            <div className="dropdown__content">
              {
                promptList.map((item, index) => (
                  <div className="dropdown__content__item" key={index} onClick={() => {
                    setSelectedAgent(item);
                    setToggleDropdown(!toggleDropdown);
                  }}>
                    <span>{item.agent}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
        {toggleDropdownRoles && (
          <div className={`dropdown ${toggleDropdownRoles ? 'dropdown__open' : ''}`}>
            <div className="dropdown__content">
              {
                ['system', 'assistant'].map((item, index) => (
                  <div className="dropdown__content__item" key={index} onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setSelectedRole(item);
                    setToggleDropdownRoles(!toggleDropdownRoles);
                  }}>
                    <span>{item}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}


      </div>
      <main className="app">
        <ChatResponseLayout isEmpty={messages.length === 0}>
          {messages.length > 0 &&
            messages.map(({ role, content }, index) => {
              if (index === 0 && selectedAgent.prompt !== '') return null;
              return (
                <Fragment key={index}>
                  <Role role={role} />
                  <ChatContent text={getFormattedText(content)} />
                </Fragment>
              );
            })}
        </ChatResponseLayout>
      </main>

      <ChatForm onSubmit={submitPrompt} onReset={resetMessages} isLoading={isLoading} selectedAgent={selectedAgent} role={selectedRole} />
      <button className={`button button--abort ${isLoading ? 'active' : ''}`} onClick={abortStream}>
        Abort
      </button>
    </div>
  );
};
