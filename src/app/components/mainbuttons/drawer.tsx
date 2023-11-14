'use client'

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import drawer from "../../../../public/images/icons/main/drawer.png"
import {useRouter} from 'next/navigation';

export default function DrawerButton() {
  const router = useRouter();
  return (
    <button className={styles.box} onClick={()=> {
      router.push('/')
    }}>
        <Image src={drawer} alt={'배경'} width={48} height={48}/>
    </button>
  );
}