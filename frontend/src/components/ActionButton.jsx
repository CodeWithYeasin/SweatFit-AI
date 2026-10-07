// src/pages/ActionButton.jsx

import React from "react";

const ActionButton = ({ label, icon, onClick, disabled = false }) => {
  return (
    <button
      className="grok-action-btn"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="grok-action-icon">{icon}</span>
      {label}
    </button>
  );
};

export default ActionButton;