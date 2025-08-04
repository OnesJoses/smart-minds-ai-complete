import React, { useState } from 'react';

const OpenAIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setMessages([...messages, { role: 'user', content: input }]);
    try {
      const res = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((msgs) => [...msgs, { role: 'assistant', content: data.reply }]);
      } else {
        setError(data.error || 'No reply from AI');
      }
    } catch (err) {
      setError('Failed to connect to AI service');
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ marginBottom: 16 }}>OpenAI Chat</h2>
      <div style={{ minHeight: 120, marginBottom: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#3b82f6' : '#8b5cf6' }}>
              {msg.role === 'user' ? 'You' : 'AI'}:
            </span> {msg.content}
          </div>
        ))}
        {loading && <div>Thinking...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: '8px 16px', borderRadius: 6, background: '#3b82f6', color: '#fff', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default OpenAIChat;
