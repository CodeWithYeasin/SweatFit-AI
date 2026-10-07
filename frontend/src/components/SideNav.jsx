// frontend/src/components/SideNav.jsx
import React, { useState } from 'react';
import './styles/SideNav.css';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [chats, setChats] = useState([
    { id: 1, title: 'BMI Calculation' },
    { id: 2, title: 'Workout Plan' },
    { id: 3, title: 'Diet Discussion' }
  ]);
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (chatId) => {
    setMenuOpen(menuOpen === chatId ? null : chatId);
  };

  return (
    <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidenav-header">
        <h2>SweatFit.AI</h2>
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          &times;
        </button>
      </div>

      <div className="chat-history">
        <div className="history-header">
          <h3>Chat History</h3>
        </div>
        
        {chats.map(chat => (
          <div key={chat.id} className="chat-item">
            <span>{chat.title}</span>
            <div className="chat-menu" onClick={() => toggleMenu(chat.id)}>
              <span>⋮</span>
              {menuOpen === chat.id && (
                <div className="menu-dropdown">
                  <button>Rename</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="new-chat">
        <input 
          type="text" 
          placeholder="Message SweatFit.AI" 
        />
        <button className="send-btn">↑</button>
      </div>
    </div>
  );
};

export default SideNav;