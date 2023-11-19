"use client";

import TimerProgram from "./timerProgram";
import Stopwatch from "./stopwatch/stopwatch";
import { GiAlarmClock } from "react-icons/gi";
import { LiaHourglassHalfSolid } from "react-icons/lia";
import styles from "./timer.module.css";
export default function Timer() {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>시간 측정</h3>
        <h4 className={styles.todayRecord}>TODAY :</h4>
        <div className={styles.stopwatch}>
          <GiAlarmClock size={30} style={{ color: "rgba(10, 57, 29, 0.9)" }} />
          <h4 className={styles.stopwatchTitle}>&nbsp;Stopwatch</h4>
        </div>
        <div>
          <Stopwatch />
        </div>
        <div className={styles.timer}>
          <LiaHourglassHalfSolid
            size={30}
            style={{ color: "rgba(10, 57, 29, 0.9)" }}
          />
          <h4 className={styles.stopwatchTitle}>&nbsp;Timer</h4>
        </div>
        <div>타이머</div>
      </div>
    </>
  );
}
