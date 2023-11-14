import mongoose, { Schema } from "mongoose";
/*
const Dummy_Data = [{
    roomName: "코딩 공부 방",
    backgroundImage: "_",
    deadLine : "2023년 12월 31일",
    studyTime: "2PM ~ 11PM",
    member : "9/10",
  }
  */
const roomSchema = new Schema({
  id: String,

  roomName: {
    type: String,
    required: [true, "Please Enter a RoomName."],
    trim: true,
    minLength: [1, "RoomName must be larger than 1 characters"],
    maxLength: [50, "RoomName must be lesser than 50 characters"],
  },
  backgroundImage : {
    type: String,
    required : [true, "Please Enter Background Image"],
  },
  deadLine : {
    type: Date,
    required : [true, "Please Enter your DeadLine"],
  },
  studyTime : {
    type: String,
    required: [true, "Please Enter your StudyTime"]
  },
  state: {
    type: Boolean,
    default: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.models.rooms || mongoose.model('rooms', roomSchema);
// 코드를 여러번 실행하더라도 동일 모델을 중복해서 생성하지 않고 기존 모델을 재사용
export default Room;
