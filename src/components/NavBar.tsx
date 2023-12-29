import { Bars3BottomLeftIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Eraser, Settings2, VenetianMask } from 'lucide-react';
import React from 'react';

export default function Navbar({ selectedAgent, setSelectedAgent, resetMessages }: {
  selectedAgent: { agent: string, prompt: string },
  setSelectedAgent: (selectedAgent: never) => void,
  resetMessages: () => void
}) {
  const [toggle, setToggle] = React.useState(false);
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const promptList = [
    {
      agent: 'spell checker',
      prompt: 'You are an English teacher. You correct English grammar and spelling mistake'
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
    <>
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

      <div className="nav_bar">
        <Bars3BottomLeftIcon className="toggle_icon" onClick={() => setToggle(!toggle)} />
        <div className="agent_selector">
          <VenetianMask className="toggle_icon" onClick={() => {
            setToggleDropdown(!toggleDropdown);
          }} />
          <Settings2 className="toggle_icon" onClick={() => {
            setToggleDropdown(!toggleDropdown);
          }} />
          <Eraser className="toggle_icon" onClick={() => {
            resetMessages();
          }} />
          {selectedAgent.prompt !== '' && (
            <div className="selected_agent">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore*/}
              <XMarkIcon className="toggle_icon" onClick={() => setSelectedAgent(item)} />
              <span>{selectedAgent.agent}</span>
            </div>
          )}
        </div>

        {toggleDropdown && (
          <div className={`dropdown ${toggleDropdown ? 'dropdown__open' : ''}`}>
            <div className="dropdown__content">
              {
                promptList.map((item: {
                  agent: string,
                  prompt: string

                }, index) => (
                  <div className={`dropdown__content__item ${selectedAgent.agent === item.agent ? 'selected_agent' : ''}`} key={index} onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
      </div>
    </>
  );
}
