
import React, { useState, useRef, useEffect } from 'react';
import './HospitalAssistant.css';

const HospitalAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! 👋 Welcome to Hridaya Hospital. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || isLoading) return;

    // Detect appointment-booking requests
    const appointmentPattern =
      /\b(book|booking|schedule|schedule a|make|fix|reserve|appointment|consult a doctor|see a doctor)\b/i;

    const showAppointmentLink =
      appointmentPattern.test(userMessage);

    setMessages((previous) => [
      ...previous,
      {
        role: 'user',
        text: userMessage,
        showAppointmentLink: false,
      },
    ]);

    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:4000/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
body: JSON.stringify({
  message: userMessage,
  history: messages.map((item) => ({
    role: item.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: item.text }],
  })),
}),

        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.reply || 'Failed to get a response from the AI.'
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text:
            data.reply ||
            'Sorry, I could not generate a response.',
          showAppointmentLink,
        },
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text:
            'Sorry, I am temporarily unable to respond. Please try again shortly.',
          showAppointmentLink,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hospital-assistant">
      {isOpen && (
        <div className="assistant-chat-window">
          <div className="assistant-header">
            <div>
              <h3>Hridaya AI Assistant</h3>
              <p>Here to help you</p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="assistant-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`assistant-message ${item.role}`}
              >
                <div>{item.text}</div>

                {item.role === 'assistant' &&
                  item.showAppointmentLink && (
                    <a
                      href="/appointment"
                      className="appointment-chat-link"
                      onClick={() => setIsOpen(false)}
                    >
                      Book an Appointment
                    </a>
                  )}
              </div>
            ))}

            {isLoading && (
              <div className="assistant-message assistant">
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="assistant-input-area"
            onSubmit={handleSend}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about our hospital..."
              aria-label="Type your message"
              disabled={isLoading}
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || !message.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="assistant-floating-button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={
          isOpen ? 'Close AI assistant' : 'Open AI assistant'
        }
        title="Ask Hridaya AI"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default HospitalAssistant;
