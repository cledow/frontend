import React, { useState } from 'react';
import Modal from 'react-modal';
import {addRoom} from '../../api/rooms/api'
import { v4 as uuidv4 } from "uuid";

const customStyles = {  
  content: {
    // 모달 스타일 설정...
  },
};




function CreateRoomModal({
  closeModal
}: {
  closeModal: () => void;
}) {
  const [roomNameInput, setRoomNameInput] = useState<string>("");
  const [backgroundImageInput, setBackgroundImageInput] = useState<string>("");
  const [deadLineInput, setDeadLineInput] = useState<string>("");
  const [studyTimeInput, setStudyTimeInput] = useState<string>("");


  /*state: {
    type: Boolean,
    default: true,
  },

  date: {
    type: Date,
    default: Date.now,
  }, */

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    /*
      const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    // text.trim : 앞뒤 여백 삭제
    const sendData = { id: uuidv4(), text, state: "active" };
    // onAdd(sendData);
    await addTodo(sendData);
    setText("");
  }; */
  //{ roomName, backgroundImage, deadLine, studyTime, state, date }
    const sendData = { id: uuidv4(), roomName : roomNameInput, backgroundImage : backgroundImageInput,
         deadLine : deadLineInput, studyTime: studyTimeInput, state: true, date: Date.now()};
         console.log(sendData);
    await addRoom(sendData);
    console.log("addRoom 실행");
    closeModal(); // 모달을 닫습니다.
    
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="방 만들기 모달"
      ariaHideApp={false}
    >
      <h2 className="text-2xl mb-4">방 만들기</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            방 이름
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={roomNameInput}
            onChange={(e) => setRoomNameInput(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            배경 이미지
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={backgroundImageInput}
            onChange={(e) => setBackgroundImageInput(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            마감 기한
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            value={deadLineInput}
            onChange={(e) => setDeadLineInput(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            스터디 시간
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={studyTimeInput}
            onChange={(e) => setStudyTimeInput(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          방 만들기
        </button>
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          닫기
        </button>
      </form>
    </Modal>
  );
}

export default CreateRoomModal;
