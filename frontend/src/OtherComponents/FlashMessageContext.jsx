import React, { createContext, useState, useContext } from "react";

// Create the FlashMessage Context
const FlashMessageContext = createContext();

// Custom hook to use the FlashMessage Context
export const useFlashMessage = () => useContext(FlashMessageContext);

// Provider component
export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);
  const [messageType, setMessageType] = useState("info"); // 'success', 'error', etc.

  const showMessage = (message, type = "info") => {
    setFlashMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000); // Hide message after 3 seconds
  };

  return (
    <FlashMessageContext.Provider value={{ showMessage }}>
      {children}
      {flashMessage && (
        <div className={`flash-message flash-message-${messageType}`}>
          {flashMessage}
        </div>
      )}
    </FlashMessageContext.Provider>
  );
};
