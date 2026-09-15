import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    console.log("SEND MESSAGE CLICKED");

    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <style>{CHAT_WIDGET_STYLES}</style>

      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-toggle-icon">
            <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5 8.38 8.38 0 01-4-1L3 20l1.3-3.9a8.38 8.38 0 01-1-4A8.5 8.5 0 0111.5 3a8.38 8.38 0 018 6.5" />
          </svg>
          Chat with Yurii
        </button>
      ) : (
        <div className="chat-widget">
          <div className="chat-widget-header">
            <div className="chat-widget-title">
              <span className="chat-avatar-ring">
                <img src="/imgs/YURI.jpeg" alt="Profile" className="chat-title-avatar" />
                <span className="chat-status-dot" />
              </span>
              <span className="chat-title-text">
                <span className="chat-title-name">Tristan Dela Cruz</span>
                <span className="chat-title-status">
                  {loading ? 'Typing…' : 'Active now'}
                </span>
              </span>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && !loading && (
              <div className="chat-empty-state">
                <span className="chat-empty-emoji">👋</span>
                <p className="chat-empty-msg">Ask me anything!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg-row ${msg.role}`}>
                <div className={`chat-msg ${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg-row assistant">
                <div className="chat-msg assistant chat-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const CHAT_WIDGET_STYLES = `
:root {
    
  --ig-gradient: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  --ig-blue-gradient: linear-gradient(135deg, #4f9dff 0%, #6a5cff 100%);
  --ig-bg: var(--card, #ffffff);
  --ig-surface: var(--bg3, #fafafa);
  --ig-border: var(--border, #efefef);
  --ig-text: var(--text, #262626);
  --ig-text-secondary: var(--muted, #8e8e8e);
  --ig-radius-lg: 22px;
  --ig-radius-md: 18px;
  --ig-shadow: 0 12px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* ---------- Toggle button ---------- */

.chat-toggle-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--ig-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1000;
}

.chat-toggle-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.08);
}

.chat-toggle-btn:active { transform: translateY(0) scale(0.98); }

.chat-toggle-icon { width: 20px; height: 20px; flex-shrink: 0; }

/* ---------- Widget shell ---------- */

.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 370px;
  max-width: calc(100vw - 32px);
  height: 560px;
  max-height: calc(60vh - 20px);
  background: var(--ig-bg);
  border-radius: var(--ig-radius-lg);
  box-shadow: var(--ig-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  animation: widget-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes widget-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ---------- Header / profile ---------- */

.chat-widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--ig-bg);
  border-bottom: 1px solid var(--ig-border);
  flex-shrink: 0;
}

.chat-widget-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ig-text);
  font-weight: 600;
  font-size: 15px;
}

.chat-avatar-ring {
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-title-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0004da;
  display: block;
}

.chat-status-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 11px;
  height: 11px;
  background: #2ecc71;
  border: 2px solid #fff;
  border-radius: 50%;
}

.chat-title-text { display: flex; flex-direction: column; line-height: 1.25; }
.chat-title-name { font-weight: 600; font-size: 14.5px; color: var(--ig-text); }
.chat-title-status { font-weight: 400; font-size: 12px; color: var(--ig-text-secondary); transition: color 0.2s ease; }

.chat-close-btn {
  border: none;
  background: var(--ig-surface);
  color: var(--ig-text-secondary);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
}

.chat-close-btn:hover { background: var(--ig-border); color: var(--ig-text); transform: scale(1.06); }
.chat-close-btn:active { transform: scale(0.92); }

/* ---------- Messages ---------- */

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--ig-bg);
}

.chat-messages::-webkit-scrollbar { width: 5px; }
.chat-messages::-webkit-scrollbar-thumb { background: var(--ig-border); border-radius: 10px; }

.chat-empty-state { margin: auto; text-align: center; color: var(--ig-text-secondary); }
.chat-empty-emoji { display: block; font-size: 30px; margin-bottom: 8px; }
.chat-empty-msg { font-size: 14px; margin: 0; }

.chat-msg-row { display: flex; width: 100%; animation: msg-in 0.24s cubic-bezier(0.16, 1, 0.3, 1); }
.chat-msg-row.user { justify-content: flex-end; }
.chat-msg-row.assistant { justify-content: flex-start; }

@keyframes msg-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-msg {
  max-width: 78%;
  padding: 10px 14px;
  margin: 4px 0;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.chat-msg.user {
  background: var(--ig-blue-gradient);
  color: #fff;
  border-radius: var(--ig-radius-md) var(--ig-radius-md) 4px var(--ig-radius-md);
}

.chat-msg.assistant {
  background: var(--ig-surface);
  color: var(--ig-text);
  border-radius: var(--ig-radius-md) var(--ig-radius-md) var(--ig-radius-md) 4px;
  border: 1px solid var(--ig-border);
}

/* ---------- Typing indicator ---------- */

.chat-typing-bubble { display: flex; align-items: center; gap: 4px; padding: 13px 16px; }

.typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b0b0b0;
  animation: typing-bounce 1.2s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

/* ---------- Input row ---------- */

.chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid var(--ig-border);
  background: var(--ig-bg);
  flex-shrink: 0;
}

.chat-input-row input {
  flex: 1;
  border: 1px solid var(--ig-border);
  background: var(--ig-surface);
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  color: var(--ig-text);
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.chat-input-row input:focus {
  border-color: #070bdf;
  background: var(--ig-bg);
  box-shadow: 0 0 0 3px rgba(204, 35, 102, 0.08);
}

.chat-input-row input::placeholder { color: var(--ig-text-secondary); }

.chat-send-btn {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: var(--ig-blue-gradient);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 8px rgba(32, 0, 243, 0.3);
}

.chat-send-btn svg { width: 17px; height: 17px; }
.chat-send-btn:hover:not(:disabled) { transform: scale(1.07); }
.chat-send-btn:active:not(:disabled) { transform: scale(0.94); }
.chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

/* ---------- Responsive ---------- */

@media (max-width: 480px) {
  .chat-widget {
    right: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
    max-width: 285px;
    height: 370px;
    max-height: calc(100vh - 100px);
  }
  .chat-toggle-btn { right: 16px; bottom: 16px; }
}
/* ---------- Reduced motion ---------- */

@media (prefers-reduced-motion: reduce) {
  .chat-widget, .chat-msg-row, .typing-dot, .chat-toggle-btn, .chat-send-btn, .chat-close-btn {
    animation: none !important;
    transition: none !important;
  }
}
`;