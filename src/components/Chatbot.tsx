'use client';
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

interface ChatbotProps {
  onClose: () => void;
}

function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState([{ user: 'system', text: 'Hi, how can I assist you today?' }]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (userInput.trim()) {
      // Add the user's input as a message in the chat
      setMessages((prevMessages) => [...prevMessages, { user: 'user', text: userInput }]);
      setIsLoading(true);

      // Send the user's input to the processInput function and get the response
      const responseText = await processInput(userInput);

      // Add the chatbot's response as a message in the chat
      setMessages((prevMessages) => [...prevMessages, { user: 'system', text: responseText }]);

      setIsLoading(false);
      setUserInput(''); // Clear the input field
      scrollToBottom();
    }
  };

  const processInput = async (input: string) => {
    const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-v0.1';
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

    try {
      const response = await axios.post(
        apiUrl,
        { inputs: input }, // Send the input text
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
        const generatedText = response.data[0].generated_text.trim();

        // Ensure that the chatbot's response doesn't include user input
        return generatedText.replace(input, '').trim(); // Remove any duplicated input in the response
      }

      return "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('Error communicating with the Hugging Face API:', error);
      return 'Error communicating with the chatbot. Please try again.';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`fixed ${isFullScreen ? 'inset-0' : 'bottom-0 right-0 m-6'} w-full max-w-sm bg-white shadow-lg rounded-lg p-4 z-50`}>
      <div className="flex justify-between items-center mb-2">
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          ✖
        </button>
        <button onClick={toggleFullScreen} className="text-gray-500 hover:text-blue-500">
          {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
        </button>
      </div>

      <div className="h-64 overflow-y-auto p-2 border border-gray-200">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.user === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block ${msg.user === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-2 rounded-md`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </span>
          </div>
        ))}
        {isLoading && <p className="text-gray-400">The bot is thinking...</p>}
        <div ref={messageEndRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`bg-blue-500 text-white ml-2 p-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
