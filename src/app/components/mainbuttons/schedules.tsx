"use client";

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import schedule from "../../../../public/images/icons/main/schedule.png";

export default function SchedulesButton({ onClick }: any) {
  const sendDataToParent = () => {
    const name = "일정관리";
    onClick(name);
  };

  return (
    <button className={styles.box} onClick={sendDataToParent}>
      <Image src={schedule} alt={"일정관리"} width={48} height={48} />
    </button>
  );
}
