import { useState, useRef } from 'react';
import { BsPlay, BsPause, BsArrowRepeat } from 'react-icons/bs';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = performance.now() - elapsedTime;
      rafIdRef.current = requestAnimationFrame(updateElapsedTime);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    setElapsedTime(0);
  };

  const updateElapsedTime = () => {
    setElapsedTime(performance.now() - startTimeRef.current);
    rafIdRef.current = requestAnimationFrame(updateElapsedTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="time-display">{formatTime(elapsedTime)}</div>
      <div className="buttons-container">
        <button onClick={handleStart} disabled={isRunning}>
          <BsPlay />
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          <BsPause />
        </button>
        <button onClick={handleReset} disabled={elapsedTime === 0}>
          <BsArrowRepeat />
        </button>
      </div>
    </div>
  );
};
