import { useReducer, useRef, useState } from 'react';
import type { ChatMessageParams } from '@/hooks/useOpenAIChatStream';
import { setCSSVariable } from '@/utils/utils';
import type { FormEvent } from 'react';

interface IChatForm {
  onSubmit: (newPrompt: ChatMessageParams[]) => void;
  onReset: () => void;
  isLoading: boolean;
  selectedAgent: {
    agent: string;
    prompt: string;
  };
}

const SYNTAX_HIGHLIGHTING_PROMPT = '\n\nUse triple backticks for syntax highlighting for the code snippets';

const getSyntaxHighlightingText = (shouldHighlight: boolean, currentInput: string) => {
  if (currentInput.includes(SYNTAX_HIGHLIGHTING_PROMPT) || !shouldHighlight) {
    return '';
  }

  return SYNTAX_HIGHLIGHTING_PROMPT;
};

export const ChatForm = ({ onSubmit, onReset, isLoading, selectedAgent }: IChatForm) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleResizeInput = () => {
    if (!inputRef.current || !formRef.current) return;
    inputRef.current.style.height = `auto`;

    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

    setCSSVariable('--response-after-height', `${formRef.current.offsetHeight}px`);
  };

  const [hasPromptBeenSent, setHasPromptBeenSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef.current) return;

    const input = inputRef.current.value.trim();

    const prompt = `${input}`.trim();

    if (!hasPromptBeenSent && selectedAgent.prompt !== '') {
      onSubmit([{ role: 'system', content: selectedAgent.prompt }, { role: 'user', content: prompt }]);
      inputRef.current.value = '';
      setHasPromptBeenSent(true);
    } else {
      onSubmit([{ role: 'user', content: prompt }]);
      inputRef.current.value = '';
    }

  };

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit}>
      <textarea
        className="form__textarea"
        ref={inputRef}
        placeholder="Type your message here..."

        autoFocus
        spellCheck={true}
        onInput={handleResizeInput}
      />
      <div className="form__buttons">
        <button type="submit" className="button" disabled={isLoading}>
          Submit
        </button>
        <button type="reset" className="button" onClick={onReset} disabled={isLoading}>
          Reset Context
        </button>
      </div>
    </form>
  );
};
