'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuAlt1Icon, ChatIcon, ClipboardListIcon, CogIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/solid';
import Chatbot from '../../components/Chatbot';

function Dashboard() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        toggleChatbot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <nav
        className={`bg-gray-800 text-white ${isSidebarCollapsed ? 'w-20' : 'w-64'
          } transition-all duration-300 p-4 flex flex-col items-start`}
      >
        <div className="flex items-center mb-6">
          <div>
            <button
              onClick={toggleSidebar}
              className="text-white bg-gray-700 p-2 rounded hover:bg-gray-600 focus:outline-none flex items-center"
            >
              <MenuAlt1Icon className="h-6 w-6 mr-2" />
            </button>
          </div>
          <div>
            {!isSidebarCollapsed && <span className="font-semibold text-2xl ml-4">Prepex</span>}
          </div>
        </div>

        <ul className="space-y-4 w-full">
          <li>
            <Link href="#">
              <div className="relative group flex items-center hover:bg-gray-600 p-2 rounded">
                <ClipboardListIcon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-2">Roadmap</span>}
                {isSidebarCollapsed && (
                  <div className="absolute left-12 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Roadmap
                  </div>
                )}
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="relative group flex items-center hover:bg-gray-600 p-2 rounded">
                <CalendarIcon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-2">Exams</span>}
                {isSidebarCollapsed && (
                  <div className="absolute left-12 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Exams
                  </div>
                )}
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="relative group flex items-center hover:bg-gray-600 p-2 rounded">
                <AcademicCapIcon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-2">Achievements</span>}
                {isSidebarCollapsed && (
                  <div className="absolute left-12 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Achievements
                  </div>
                )}
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="relative group flex items-center hover:bg-gray-600 p-2 rounded">
                <CogIcon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-2">Settings</span>}
                {isSidebarCollapsed && (
                  <div className="absolute left-12 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Settings
                  </div>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        {!isChatbotOpen && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={toggleChatbot}
              className="relative bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out group hover:pr-6" // expanding width on hover
            >
              <ChatIcon className="h-5 w-5" />

              <span className="ml-2 overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-xs transition-[max-width] duration-300 ease-in-out">
                Open Chatbot (Alt + M)
              </span>
            </button>
          </div>
        )}


        {isChatbotOpen && <Chatbot onClose={closeChatbot} />}
      </main>
    </div>
  );
}

export default Dashboard;
