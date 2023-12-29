import { Eraser, RefreshCw, SendHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ChatMessageParams } from '@/hooks/useOpenAIChatStream';
import { setCSSVariable } from '@/utils/utils';
import type { FormEvent } from 'react';
import classes from './ButtonSubmit.module.css';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

interface IChatForm {
  onSubmit: (newPrompt: ChatMessageParams[]) => void;
  onReset: () => void;
  isLoading: boolean;
  resetMessages: () => void;
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

export const ChatForm = ({ onSubmit, onReset, isLoading, selectedAgent, resetMessages }: IChatForm) => {
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
      <div className="form__buttons">
        <button type="submit" className={classes.button} disabled={isLoading} onClick={resetMessages}>
          <Eraser />
        </button>
        <button type="reset" className={classes.button} onClick={onReset} disabled={isLoading}>
          <RefreshCw />
        </button>
      </div>
      <textarea
        className="form__textarea"
        ref={inputRef}
        placeholder="Type your message here..."
        autoFocus
        spellCheck={true}
        onInput={handleResizeInput}
      />
      <button type="submit" className={classes.button_send} disabled={isLoading}>
        <SendHorizontal />
      </button>
    </form>
  );
};
