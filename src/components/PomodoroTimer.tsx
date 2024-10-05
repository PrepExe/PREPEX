'use client';

import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [time, setTime] = useState(1500); // 25 minutes in seconds for Pomodoro timer
  const [initialTime, setInitialTime] = useState(1500); // To track the full session time for progress

  // Pomodoro Timer Functionality
  useEffect(() => {
    let interval: any = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      if (isBreak) {
        setTime(1500);
        setInitialTime(1500);
        setIsBreak(false);
      } else {
        setTime(300);
        setInitialTime(300);
        setIsBreak(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(1500);
    setInitialTime(1500);
  };

  const percentage = 100 - (time / initialTime) * 100;

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
      <div className="w-1/3 flex flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold mb-4">Pomodoro Timer</h1>
        </div>

        <div className="relative w-72 h-72">
          <CircularProgressbar
            value={percentage}
            text={formatTime(time)}
            styles={buildStyles({
              pathColor: isBreak ? '#6EE7B7' : '#3B82F6',
              textColor: '#FFF',
              trailColor: '#2D3748',
              backgroundColor: '#1A202C',
            })}
          />
        </div>

        <div className="flex mt-6 space-x-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="bg-red-600 text-white px-6 py-2 rounded-lg">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
