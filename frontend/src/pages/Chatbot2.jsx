import React, { useState } from 'react';
import { marked } from 'marked';
import '../styles/chat.css';

const Chatbot2 = () => {
  const [input, setInput] = useState('');
  const [responseHTML, setResponseHTML] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponseHTML('❗ Please enter a message.');
      return;
    }

    setLoading(true);
    setResponseHTML('⏳ Loading...');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_OPENROUTER_API_KEY', // Replace with your OpenRouter API Key
          'HTTP-Referer': 'http://localhost:5173/chat', // Replace with your site
          'X-Title': 'http://localhost:5173/chatbot',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
      setResponseHTML(marked.parse(markdownText));
    } catch (error) {
      setResponseHTML(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="chatbot-title">Sweatfit ChatBot</h2>
      </div>
      
      <div className="chatbot-input-container">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Enter your question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      
      <button 
        className={`chatbot-button ${loading ? 'loading' : ''}`}
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Ask!'}
      </button>
      
      <div 
        className={`chatbot-response ${responseHTML ? 'visible' : ''}`}
        dangerouslySetInnerHTML={{ __html: responseHTML }} 
      />
    </div>
  );
};

export default Chatbot2;
