'use client'

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import clock from "../../../../public/images/icons/main/clock.png"
import {useRouter} from 'next/navigation';

export default function ClockButton() {
  const router = useRouter();
  return (
    <button className={styles.box} onClick={()=> {
      router.push('/')
    }}>
        <Image src={clock} alt={'타이머'} width={48} height={48}/>
    </button>
  );
}
