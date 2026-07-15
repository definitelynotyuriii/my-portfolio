import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
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

  if (!isOpen) {
    return (
      <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-toggle-icon">
          <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5 8.38 8.38 0 01-4-1L3 20l1.3-3.9a8.38 8.38 0 01-1-4A8.5 8.5 0 0111.5 3a8.38 8.38 0 018 6.5" />
        </svg>
        Chat with AI
      </button>
    );
  }

return (
  <div className="chat-widget">
    <div className="chat-widget-header">
      <div className="chat-widget-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-title-icon">
          <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5 8.38 8.38 0 01-4-1L3 20l1.3-3.9a8.38 8.38 0 01-1-4A8.5 8.5 0 0111.5 3a8.38 8.38 0 018 6.5" />
        </svg>
        Chat with AI
      </div>
      <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✕</button>
    </div>
    <div className="chat-messages">
      {messages.length === 0 && (
        <p className="chat-empty-msg">Ask me anything about Tristan!</p>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`chat-msg ${msg.role}`}>
          {msg.content}
        </div>
      ))}
      {loading && <div className="chat-msg assistant">Thinking...</div>}
    </div>
    <div className="chat-input-row">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me something..."
      />
      <button onClick={sendMessage} disabled={loading}>Send</button>
    </div>
  </div>
);
}