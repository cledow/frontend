'use client'

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import memo from "../../../../public/images/icons/main/memo.png"


export default function MemoButton({onClick} : any) {
  const sendDataToParent = () => {
    const name = '메모';
    onClick(name)
  }

  return (
    <button className={styles.box} onClick={sendDataToParent}>
        <Image src={memo} alt={'메모'} width={48} height={48}/>
    </button>
  );
}