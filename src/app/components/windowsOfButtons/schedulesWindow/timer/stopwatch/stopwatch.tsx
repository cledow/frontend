import { useState, useRef } from "react";
import { BsPlay, BsPause, BsFillStopFill } from "react-icons/bs";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import styles from "./stopwatch.module.css";

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
    } else {
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
    // 기록하시겠습니까? 모달창 넣기
  };

  const updateElapsedTime = () => {
    setElapsedTime(performance.now() - startTimeRef.current);
    rafIdRef.current = requestAnimationFrame(updateElapsedTime);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    // const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className={styles.stopwatchContainer}>
        <div className={styles.timeDisplay}>{formatTime(elapsedTime)}</div>
        <div className={styles.buttonsContainer}>
          <button onClick={handleStart}>
            {isRunning ? <BsPause size={25} /> : <BsPlay size={25} />}{" "}
          </button>
          {/* <button onClick={handlePause} disabled={!isRunning}>
          <BsPause size={25} />
        </button> */}
          <button onClick={handleReset} disabled={elapsedTime === 0}>
            <BsFillStopFill size={25} />
          </button>
          <button>
            <MdOutlineAddCircleOutline size={25} />
          </button>
        </div>
      </div>
    </>
  );
}
