import { useMemo, useState } from 'react';
import { Bot, Mail, MessageCircle, Send, X } from 'lucide-react';
import { profile } from '../../data/portfolio.js';
import { quickPrompts } from './portfolioAgent.js';

const initialMessages = [
  {
    role: 'agent',
    text:
      `Hi, I am ${profile.name}'s assistant. Ask me about his systems, skills, projects, or how to contact him.`,
  },
];

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const unreadLabel = useMemo(() => (isOpen ? 'Close assistant' : 'Open assistant'), [isOpen]);

  async function askBackend(prompt) {
    const response = await fetch(`${apiUrl}/agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.detail || 'Assistant backend failed.');
    }

    return response.json();
  }

  async function sendMessage(value = input) {
    const cleanValue = value.trim();

    if (!cleanValue || isSending) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: 'visitor', text: cleanValue },
    ]);
    setInput('');
    setIsOpen(true);
    setIsSending(true);

    try {
      const reply = await askBackend(cleanValue);
      setMessages((current) => [
        ...current,
        {
          role: 'agent',
          text: reply.text,
          actionLabel: reply.actionLabel,
          href: reply.href,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'agent',
          text:
            error.message ||
            'The AI assistant needs the backend and OpenAI API key before it can answer.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className={`ai-agent ${isOpen ? 'is-open' : ''}`}>
      {isOpen ? (
        <section className="agent-panel" aria-label="Profile assistant">
          <header className="agent-header">
            <div>
              <span className="agent-icon">
                <Bot size={18} />
              </span>
              <div>
                <strong>Profile Assistant</strong>
                <small>Project assistant</small>
              </div>
            </div>
            <button type="button" aria-label="Close assistant" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </header>

          <div className="agent-messages">
            {messages.map((message, index) => (
              <div className={`agent-message ${message.role}`} key={`${message.role}-${index}`}>
                <p>{message.text}</p>
                {message.href ? (
                  <a href={message.href}>
                    <Mail size={15} /> {message.actionLabel}
                  </a>
                ) : null}
              </div>
            ))}
            {isSending ? (
              <div className="agent-message agent typing">
                <p>Preparing an answer...</p>
              </div>
            ) : null}
          </div>

          <div className="quick-prompts" aria-label="Quick prompts">
            {quickPrompts.map((prompt) => (
              <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="agent-input" onSubmit={handleSubmit}>
            <input
              aria-label="Ask the assistant"
              placeholder="Ask about systems, skills, contact..."
              value={input}
              disabled={isSending}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" aria-label="Send question" disabled={isSending}>
              <Send size={17} />
            </button>
          </form>
        </section>
      ) : null}

      <button className="agent-toggle" type="button" aria-label={unreadLabel} onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? <X size={22} /> : <MessageCircle size={23} />}
        <span>Ask</span>
      </button>
    </div>
  );
}
