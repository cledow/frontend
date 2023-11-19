"use client";

import styles from "./todo.module.css";
import trash from "./../../../../../../../../public/images/icons/trash.png";
import React, { useState } from "react";
import Image from "next/image";
import { deleteTodo } from "@/app/api/todo/api";
import TodoModal from "../modal/todoModal";
import { PiStarLight } from "react-icons/pi";
import { PiStarFill } from "react-icons/pi";
import { editTodo } from "@/app/api/todo/api";
import {PiTrash}  from "react-icons/pi";

export default function Todo({ todo, onUpdate, onDelete, onEdit }: any) {
  const { id, text, state, bookmark } = todo;
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => setShowModal(!showModal);

  //완료 여부 관리
  const handleState = async (e: any) => {
    const state = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, state });
    await editTodo({ ...todo, state });
  };

  // 즐겨찾기 관리
  const handleBookmark = async (e: any) => {
    const bookmark = e.target.checked ? true : false;
    onEdit({ ...todo, bookmark });
    await editTodo({ ...todo, bookmark });
  };

  const handleDelete = async () => {
    await deleteTodo(id);
    onDelete(todo);
  };

  const handleEdit = (edited: any) => {
    const text = edited;
    onEdit({ ...todo, text });
  };

  //radio버튼 토글
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  if (todo.text) {
    return (
      <div className={styles.container}>
        <input
          className={styles.mainCheckbox}
          type="radio"
          value={id}
          checked={isChecked}
          onClick={handleToggle}
        />
        <section className={styles.todoSection}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id={id}
            checked={state === "completed"}
            onChange={handleState}
          />
          <label
            className={state === "completed" ? styles.completed : styles.active}
            onClick={() => {
              setShowModal(true);
            }}
          >
            {text}
          </label>
          <span className={styles.icon}>
            <label>
              {bookmark ? <PiStarFill style={{color:'rgba(10, 57, 29, 0.9)'}}/> : <PiStarLight style={{color:'rgb(7, 40, 20)'}}/>}
              <input
                type="checkbox"
                id={id}
                checked={bookmark === true}
                onChange={handleBookmark}
              />
            </label>
          </span>
          {showModal && (
            <TodoModal
              closeModal={closeModal}
              todo={todo}
              onEdit={handleEdit}
            />
          )}
          <span className={styles.icon}>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <PiTrash style={{color:'rgb(7, 40, 20)'}}/>
            </button>
          </span>
        </section>
      </div>
    );
  }
}
