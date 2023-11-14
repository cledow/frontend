"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./addTodo.module.css";
import { addTodo } from "@/app/api/todo/api";

export default function AddTodo({ onAdd }: any) {
  const [text, setText] = useState("");
  const handleChange = (e: any) => setText(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    // text.trim : 앞뒤 여백 삭제
    const sendData = {bookmark:false, id:uuidv4(), text, state: "active"};
    setText("");
    onAdd(sendData);
    console.log(sendData);
    await addTodo(sendData);
  };

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <input
        className={styles.addInput}
        type="text"
        placeholder="할 일을 추가해보세요."
        value={text}
        onChange={handleChange}
      />
      <button className={styles.addButton}>입력</button>
    </form>
  );
}
