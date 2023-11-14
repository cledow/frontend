import React, { useState } from "react";
import styles from "./ScheduleWindow.module.css";
import Goal from "./goal/goal";
import Memo from "./memo/memo";
import Dday from "./dDay/dDay";
import Timer from "./timer/timer";

export default function SchedulesWindow() {
  const [showWindowContents, setShowWindowContents] = useState('Goal');

  return (
    <div className={styles.container}  style={{fontFamily: "IBM"}}>
      <div className={styles.main}>
        {showWindowContents === "Goal" && <Goal />}
        {showWindowContents === "Memo" && <Memo />}
        {showWindowContents === "Dday" && <Dday />}
        {showWindowContents === "Timer" && <Timer />}
      </div>
      <footer className={styles.footer}>
        <ul className={styles.underMenu}>
          <li onClick={() => setShowWindowContents("Goal")} style={{ color: showWindowContents === 'Goal' ? 'rgb(153, 0, 51)' : '' }}>목표</li> 
          <li onClick={() => setShowWindowContents("Memo")} style={{ color: showWindowContents === 'Memo' ? 'rgb(153, 0, 51)' : '' }}>메모</li>
          <li onClick={() => setShowWindowContents("Dday")} style={{ color: showWindowContents === 'Dday' ? 'rgb(153, 0, 51)' : '' }}>D-Day</li>
          <li onClick={() => setShowWindowContents("Timer")} style={{ color: showWindowContents === 'Timer' ? 'rgb(153, 0, 51)' : '' }}>타이머</li>
        </ul>
      </footer>
    </div>
  );
}
