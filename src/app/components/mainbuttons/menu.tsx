"use client";

import styles from "../mainbuttons/mainButtons.module.css";
import Image from "next/image";
import menu from "../../../../public/images/icons/main/menu.png";
import React, { useState} from "react";
// import {useRouter} from 'next/navigation';

function MenuButton({onDataChange} : any) {
  const [sideToggle, setSideToggle] = useState(false);
  const sendDataToParent = () => {
    setSideToggle(!sideToggle);
    const newData = sideToggle;
    onDataChange(newData);
  }
  
  return (
    <button className={styles.box} onClick={sendDataToParent}>
      <Image src={menu} alt={"메뉴"} width={48} height={48} />
    </button>
  );
}

export default MenuButton;


