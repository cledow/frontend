"use client";

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import messenger from "../../../../public/images/icons/main/messenger.png";

export default function MessengerButton({ onClick }: any) {
  const sendDataToParent = () => {
    const name = "메신저";
    onClick(name);
  };

  return (
    <button className={styles.box} onClick={sendDataToParent}>
      <Image src={messenger} alt={"메신저"} width={48} height={48} />
    </button>
  );
}
