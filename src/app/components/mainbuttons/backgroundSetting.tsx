"use client";

import Image from "next/image";
import backgroundSetting from "../../../../public/images/icons/main/backgroundSetting.png";
// import { useRouter } from "next/navigation";
import styles from "../mainbuttons/mainButtons.module.css";

export default function BackgroundSettingButton({onClick} : any) {
  const sendDataToParent = () => {
    const name = '배경설정';
    onClick(name)
  }

  return (
    <button className={styles.box} onClick={sendDataToParent}>
        <Image src={backgroundSetting} alt={'배경설정'} width={48} height={48}/>
    </button>
  );
}
