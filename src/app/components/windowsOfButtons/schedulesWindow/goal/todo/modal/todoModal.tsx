"use client";

import styles from "./todoModal.module.css";
import Modal from "react-modal";
import { editTodo } from "@/app/api/todo/api";
import { useState } from "react";
import Image from "next/image";
import Pen from "../../../../../../../../public/images/icons/pen.png";
import Planner from "../../../memo/memo";

interface ModalProps {
  closeModal: () => void;
  todo: any;
  onEdit: any;
}

export default function TodoModal({ closeModal, todo, onEdit }: ModalProps) {
  const { id, text, state } = todo;
  const handleClickInsideModal = (e: any) => {
    e.stopPropagation();
  };

  const [editedTask, setEditedTask] = useState<string>(text);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { id, editedTask, state };
    onEdit(editedTask);
    await editTodo(newTodo);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className={styles.modal}
      contentLabel="edit Todo"
      ariaHideApp={false}
    >
      <div className={styles.modalOpen}>
        <button
          onClick={() => closeModal()}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.todoBox}>
            <div className={styles.todoTitle}>
              <Image src={Pen} alt={"아이콘"} width={20} height={20} />
              <label>할 일</label>
            </div>
            <input
              onClick={handleClickInsideModal}
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              type="text"
              placeholder="할 일을 입력하세요."
              className={styles.todoInput}
            />
          </div>
          <div className={styles.repeatSettingBox}>
            <div className={styles.repeatSettingTitle}>
              <Image src={Pen} alt={"아이콘"} width={20} height={20} />
              <label>반복 설정</label>
            </div>
            <div className={styles.settingCategories}>
              <button type="button" className={styles.subBtn}>
                없음
              </button>
              <button type="button" className={styles.subBtn}>
                매일
              </button>
              <button type="button" className={styles.subBtn}>
                평일
              </button>
              <button type="button" className={styles.subBtn}>
                사용자 지정
              </button>
            </div>
          </div>
          <div className={styles.simpleMemoBox}>
            <div className={styles.simpleMemoTitle}>
              <Image src={Pen} alt={"아이콘"} width={20} height={20} />
              <label>메 모</label>
            </div>
            <Planner/>
          </div>
          <div className={styles.submitBox}>
            <button type="submit" className={styles.confirmBtn}>
              확 인
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => closeModal()}>
              취 소
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
