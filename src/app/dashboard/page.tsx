'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChatIcon } from '@heroicons/react/solid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/Progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chatbot from '../../components/Chatbot';
import Layout from '../../components/Layout';

// Simulated data - in a real app, this would come from an API or database
const studyData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 2 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 4 },
];

const recentMaterials = [
  { id: 1, title: 'Advanced Calculus Notes', link: '/materials/1' },
  { id: 2, title: 'Physics Lab Report', link: '/materials/2' },
  { id: 3, title: 'History Essay Draft', link: '/materials/3' },
];

const quickTasks = [
  { id: 1, text: 'Review Chapter 5 for Biology', completed: false },
  { id: 2, text: 'Complete Math Problem Set', completed: true },
  { id: 3, text: 'Start Research for History Paper', completed: false },
];

function Dashboard() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [tasks, setTasks] = useState(quickTasks);

  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);
  const closeChatbot = () => {
    setIsChatbotOpen(false);
    setIsChatFullScreen(false);
  };
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const handleFullScreenToggle = () => {
    setIsChatFullScreen((prevState) => !prevState);
    setIsSidebarCollapsed(true);
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

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsTimerRunning((prev) => !prev);
  const resetTimer = () => {
    setStudyTimer(0);
    setIsTimerRunning(false);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const SidebarLink = ({ icon: Icon, text, href }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, text: string, href: string }) => (
    <li>
      <Link href={href}>
        <div className="relative group flex items-center hover:bg-white/20 p-2 rounded transition-all duration-300">
          <Icon className="h-6 w-6" />
          {!isSidebarCollapsed && <span className="ml-2">{text}</span>}
          {isSidebarCollapsed && (
            <div className="absolute left-12 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {text}
            </div>
          )}
        </div>
      </Link>
    </li>
  );

  return (
    <Layout>
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Study Dashboard</h1>

        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Study Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">{formatTime(studyTimer)}</div>
              <div className="flex space-x-2">
                <button onClick={toggleTimer} className={`px-4 py-2 rounded ${isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}>
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-300">
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={studyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Mathematics</h3>
              <p className="text-gray-600 mb-2">Date: October 15, 2024</p>
              <p className="text-gray-600 mb-4">Time Remaining: 9 days</p>
              <Progress value={66} className="w-full" />
            </CardContent>
          </Card>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Study Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentMaterials.map((material) => (
                  <li key={material.id} className="flex items-center justify-between">
                    <span>{material.title}</span>
                    <Link href={material.link}>
                      <span className="text-blue-500 hover:text-blue-700">View</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mr-2"
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {!isChatbotOpen && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={toggleChatbot}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-blue-700"
            >
              <ChatIcon className="h-6 w-6" />
              <span className="ml-2 hidden md:inline">Prepex Chat</span>
            </button>
          </div>
        )}

        {isChatbotOpen && (
          <Chatbot
            onClose={closeChatbot}
            onFullScreenToggle={handleFullScreenToggle}
            isFullScreen={isChatFullScreen}
          />
        )}
      </main>
    </div>
    </Layout>
  );
}

export default Dashboard;
