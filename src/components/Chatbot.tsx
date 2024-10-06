'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Calendar, Clock, BookOpen, User, Moon, History, PlusCircle, X, Maximize, Minimize } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
  onFullScreenToggle: () => void;
  isFullScreen: boolean;
}

interface Message {
  user: 'system' | 'user';
  text: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = process.env.NEXT_PUBLIC_SYSTEM_PROMPT ;

function Chatbot({ onClose, onFullScreenToggle, isFullScreen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    return storedMessages.map((msg: Message) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  });

  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[][]>(() => JSON.parse(localStorage.getItem('chatHistory') || '[]'));
  const [currentGoal, setCurrentGoal] = useState('');
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // For displaying chat history modal
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSend = async () => {
    if (userInput.trim()) {
      const newMessage: Message = { user: 'user', text: userInput, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsLoading(true);

      const responseText = await processInput(userInput);
      const botResponse: Message = { user: 'system', text: responseText, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      setIsLoading(false);
      setUserInput('');
      scrollToBottom();
    }
  };

  const processInput = async (input: string) => {
    if (input.toLowerCase().includes('video') || input.toLowerCase().includes('watch')) {
      return suggestLearningVideos();
    }

    const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

    try {
      const response = await axios.post(
        apiUrl,
        {
          inputs: `${SYSTEM_PROMPT}\n\nUser: ${input}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 512,
            return_full_text: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
        return response.data[0].generated_text.trim();
      }

      return "I apologize, but I couldn't process that request. How else can I assist you with your studies or personal growth?";
    } catch (error) {
      console.error('Error communicating with the Hugging Face API:', error);
      return 'I encountered an error while processing your request. Could you please try again or rephrase your question?';
    }
  };

  const suggestLearningVideos = () => {
    const learningVideos = [
      {
        title: 'Introduction to C++ Programming',
        url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
      },
      {
        title: 'Python for Beginners - Full Course',
        url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
      },
      {
        title: 'Khan Academy - Learn Calculus',
        url: 'https://www.khanacademy.org/math/calculus-1',
      },
      {
        title: 'Coursera - Data Science Specialization',
        url: 'https://www.coursera.org/specializations/jhu-data-science',
      },
    ];

    return `
      Here are some educational resources you can check out:
      1. [${learningVideos[0].title}](${learningVideos[0].url})
      2. [${learningVideos[1].title}](${learningVideos[1].url})
      3. [${learningVideos[2].title}](${learningVideos[2].url})
      4. [${learningVideos[3].title}](${learningVideos[3].url})
    `;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const setGoal = () => {
    if (currentGoal.trim()) {
      const goalMessage: Message = { 
        user: 'system', 
        text: `New goal set: ${currentGoal}. Remember, setting clear goals is a great step towards productivity. Let's work on achieving this together!`, 
        timestamp: new Date() 
      };
      setMessages((prevMessages) => [...prevMessages, goalMessage]);
      setCurrentGoal('');
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      const timerMessage: Message = { 
        user: 'system', 
        text: "Study timer started. Remember to take breaks every 25-30 minutes to maintain focus and avoid burnout!", 
        timestamp: new Date() 
      };
      setMessages((prevMessages) => [...prevMessages, timerMessage]);
    }
  };

  const resetTimer = () => {
    setStudyTimer(0);
    setIsTimerRunning(false);
    const timerResetMessage: Message = { 
      user: 'system', 
      text: `Study session ended. You studied for ${formatTime(studyTimer)}. Great job! Take a moment to reflect on what you've learned.`, 
      timestamp: new Date() 
    };
    setMessages((prevMessages) => [...prevMessages, timerResetMessage]);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startNewChat = () => {
    setChatHistory([...chatHistory, messages]); // Save current chat to history
    setMessages([]); // Start a new chat
    setStudyTimer(0); // Reset timer
    setCurrentGoal(''); // Clear goal
  };

  const loadChatHistory = (index: number) => {
    setMessages(chatHistory[index]); // Load a specific chat from history
    setShowHistoryModal(false); // Close modal after selecting a chat
  };

  return (
    <div
      className={`fixed bottom-0 ${isFullScreen ? 'top-0 right-0' : 'right-0'} ${isFullScreen ? 'w-[calc(100%-5rem)]' : 'w-full max-w-sm'} bg-white shadow-xl rounded-lg z-50 flex flex-col`}
      style={isFullScreen ? { left: '5rem' } : {}}
    >
      {/* Header with close, fullscreen, and new chat button */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            <X className="w-5 h-5" />
          </button>
          <button onClick={onFullScreenToggle} className="text-gray-500 hover:text-blue-500 text-sm">
            {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <button onClick={startNewChat} className="text-green-500 hover:text-green-600 text-sm flex items-center space-x-1">
            <PlusCircle className="w-5 h-5" /> <span>New Chat</span>
          </button>
        </div>
        <div className="text-lg font-semibold">Student Assistant</div>
        <button 
          onClick={() => setShowHistoryModal(true)} 
          className="text-gray-500 hover:text-blue-500 text-sm flex items-center space-x-1"
        >
          <History className="w-5 h-5" /> <span>History</span>
        </button>
      </div>

      {/* Productivity tools */}
      <div className="bg-gray-50 p-4 border-b border-gray-300">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={currentGoal}
            onChange={(e) => setCurrentGoal(e.target.value)}
            placeholder="Set a goal..."
            className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
          />
          <button onClick={setGoal} className="bg-green-500 text-white rounded-lg px-3 py-2 text-sm">
            Set Goal
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-semibold">{formatTime(studyTimer)}</span>
          </div>
          <div>
            <button onClick={toggleTimer} className={`px-3 py-1 rounded-lg text-sm mr-2 ${isTimerRunning ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>
              {isTimerRunning ? 'Pause' : 'Start'} Timer
            </button>
            <button onClick={resetTimer} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Message history */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 ${isFullScreen ? 'h-[calc(100vh-200px)]' : 'max-h-[700px]'}`}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.user === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 max-w-xs lg:max-w-md rounded-lg ${msg.user === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
              <div className="text-xs mt-1 text-gray-500">
                {msg.timestamp instanceof Date
                  ? msg.timestamp.toLocaleTimeString()
                  : new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <p className="text-gray-400 text-center">Thinking...</p>}
        <div ref={messageEndRef} />
      </div>

      {/* Chat history */}
      <div className="bg-gray-100 p-4 border-t border-gray-300 flex items-center space-x-4 overflow-x-auto">
        <History className="w-5 h-5 text-gray-500" />
        {chatHistory.map((_, index) => (
          <button
            key={index}
            onClick={() => loadChatHistory(index)}
            className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm"
          >
            Chat {index + 1}
          </button>
        ))}
      </div>

      {/* User input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100 border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Ask me anything about studying or personal growth..."
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Send
        </button>
      </div>

      {/* Chat History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Chat History</h3>
            <div className="space-y-4 overflow-y-auto max-h-96">
              {chatHistory.map((_, index) => (
                <button
                  key={index}
                  onClick={() => loadChatHistory(index)}
                  className="block w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-left"
                >
                  Chat Session {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
