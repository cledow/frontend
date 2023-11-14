"use client";

import styles from "./memo.module.css";
import Image from "next/image";
import label from "./../../../../../../public/images/icons/memoLabel.png";
import React, { useState } from "react";

export default function Memo() {
  const [memoText, setMemoText] = useState("");
  const maxLength = 75; // 최대 글자 수
  const maxNewlines = 2; // 최대 줄바꿈 수

  const handleInputChange = (e: any) => {
    const inputText = e.target.value;
    const newlineCount = (inputText.match(/\n/g) || []).length; // 줄바꿈 수 계산
    if (
      inputText.length <= maxLength &&
      newlineCount <= maxNewlines &&
      e.key !== "Enter"
    ) {
      setMemoText(inputText);
    }
  };
  return (
    <div>
      <label className={styles.memoLabel}>
        <textarea
          className={styles.textarea}
          value={memoText}
          onChange={handleInputChange}
          onKeyDown={handleInputChange} //enter 키 처리
          name="메모"
          cols={48}
          rows={3}
          placeholder="일정에 관해 간단히 메모해보세요."
        />
      </label>
    </div>
  );
}
