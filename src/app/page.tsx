"use client";

import styles from "../app/page.module.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SideLists from "./components/sideList/sideLists";
import BackgroundSettingButton from "./components/mainbuttons/backgroundSetting";
import MessengerButton from "./components/mainbuttons/messenger";
import SchedulesButton from "./components/mainbuttons/schedules";
import MenuButton from "./components/mainbuttons/menu";
import ClockButton from "./components/mainbuttons/clock";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "./../../public/images/icons/close.png";
import MemoButton from "./components/mainbuttons/memo";
import BackgroundSettingWindow from "./components/windowsOfButtons/backgroundSettingWindow";
import SchedulesWindow from "./components/windowsOfButtons/schedulesWindow/schedulesWindow";
import MemoWindow from "./components/windowsOfButtons/memoWindow";
import MessengerWindow from "./components/windowsOfButtons/messengerWindow";

import Draggable from "react-draggable";

export default function HomePage() {

  const [visibleWindows, setVisibleWindows] = useState<string[]>([]);
  const handleButtonClick = (buttonText: string) => {
    if (visibleWindows.includes(buttonText)) {
      setVisibleWindows((prevWindows) =>
        prevWindows.filter((windowText) => windowText !== buttonText)
      );
    } else {
      setVisibleWindows((prevWindows) => [...prevWindows, buttonText]);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 불러온 위치 정보를 적용
    const savedPositions = JSON.parse(
      localStorage.getItem("windowPositions") || "[]"
    );
    if (savedPositions) {
      setVisibleWindows(savedPositions);
    }
  }, []);

  useEffect(() => {
    // visibleWindows 상태가 업데이트될 때마다 위치 정보 저장
    localStorage.setItem("windowPositions", JSON.stringify(visibleWindows));
  }, [visibleWindows]);

  const handleDrag = (e, ui, windowText) => {
    // 드래그 중인 창의 위치를 업데이트
    // 여기서 버튼 텍스트로 해당 창을 구분하여 위치 정보를 관리
    // e는 드래그 이벤트, ui는 드래그 위치 정보를 담고 있음
    // 창의 위치 정보는 여기서 적절한 방식으로 상태 업데이트를 통해 처리
  };

  //사이드메뉴 토글
  const [data, setData] = useState(true);
  const handleDataChange = (newData: any) => {
    setData(newData);
  };

  return (
    // clockButton은 다르게 구현 예정
    <>
      <header
        className={`${styles["side-menu"]} ${
          data ? styles.visible : styles.hidden
        }`}
      >
        <SideLists />
      </header>
      <div className={styles.background}>
        <div className={styles.mainbuttons}>
          <BackgroundSettingButton onClick={handleButtonClick} />
          <SchedulesButton onClick={handleButtonClick} />
          {/* <MemoButton onClick={handleButtonClick} /> */}
          <MessengerButton onClick={handleButtonClick} />
          <ClockButton />
          <MenuButton onDataChange={handleDataChange} />
        </div>
      </div>
      {visibleWindows.map((windowText) => (
        <Draggable
          key={windowText}
          onDrag={(e, ui) => handleDrag(e, ui, windowText)}
          handle=".whiteSpace" // 드래그가 가능한 영역(className)
        >
          <div className={styles.window}>
            <div className='whiteSpace' style={{cursor:'move', height:'25px'}}></div>
            <button
              className={styles.close}
              onClick={() => handleButtonClick(windowText)}
            >
              <Image src={close} alt={"닫기"} />
            </button>
            {windowText === "배경설정" && <BackgroundSettingWindow />}
            {windowText === "일정관리" && <SchedulesWindow />}
            {/* {windowText === "메모" && <MemoWindow />} */}
            {windowText === "메신저" && <MessengerWindow />}
          </div>
        </Draggable>
      ))}
    </>
  );
}