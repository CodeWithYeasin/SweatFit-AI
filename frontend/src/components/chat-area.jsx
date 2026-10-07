// frontend/src/components/ChatArea.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Send, Paperclip, Search } from "lucide-react";
import MessageItem from "./MessageItem";

export default function ChatArea({ messages, onSendMessage, onToggleSidebar }) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button
          className="p-1 mr-2 rounded-md hover:bg-gray-700 md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end rounded-lg bg-[#27282c] border border-gray-700 overflow-hidden">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message DeepSeek"
                className="flex-1 max-h-[200px] py-3 pl-4 pr-10 bg-transparent outline-none resize-none"
                rows={1}
              />
              <div className="flex items-center px-2 py-2">
                <button
                  type="button"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs">OpenTools</span>
                    <span className="text-xs bg-blue-600 px-1 py-0.5 rounded">
                      (F1)
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 ml-1"
                >
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 ml-1"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="submit"
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 ml-1"
                  disabled={!inputValue.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </form>
          <div className="text-xs text-center mt-2 text-gray-500">
            AI-generated, for reference only
          </div>
        </div>
      </div>
    </div>
  );
}