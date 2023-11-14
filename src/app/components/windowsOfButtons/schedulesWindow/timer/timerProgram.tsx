import React, { useState, useEffect } from 'react';
import styles from './TimerProgram.module.css';

export default function TimerProgram() {
  const [seconds, setSeconds] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (running) {
      const id = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [running, intervalId]);

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  const handleInputChange = (event: any) => {
    setInputSeconds(parseInt(event.target.value));
  };

  const handleSetTime = () => {
    setSeconds(inputSeconds);
  };

  return (
    <div className={styles.TimerProgram} style={{fontFamily: "IBM"}}>
      <h1>타이머</h1>
      <p>경과 시간: {seconds}초</p>
      <div>
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputChange}
          disabled={running}
        />
        <button onClick={handleSetTime} disabled={running}>
          시간 설정
        </button>
      </div>
      <div>
        {!running && (
          <button onClick={handleStart}>시작</button>
        )}
        {running && (
          <button onClick={handlePause}>일시정지</button>
        )}
        <button onClick={handleReset}>리셋</button>
      </div>
    </div>
  );
}