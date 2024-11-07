// ChatWidget.jsx
import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 
    localStorage.getItem('chatSessionId') || 
    Math.random().toString(36).substring(7)
  );

  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId);
    loadMessages();
  }, [sessionId]);

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/chat/messages?session_id=${sessionId}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          session_id: sessionId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        await loadMessages(); // Reload all messages
        setInput('');
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="chat-toggle">
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>AI Assistant</h3>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? '...' : '➤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;