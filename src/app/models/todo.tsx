import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  bookmark: {
    type: Boolean,
    default: false,
  },

  id: String,

  text: {
    type: String,
    required: [true, "task is required."],
    trim: true,
    minLength: [1, "task must be larger than 1 characters"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },

  state: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.models.todos || mongoose.model('todos', todoSchema);
// 코드를 여러번 실행하더라도 동일 모델을 중복해서 생성하지 않고 기존 모델을 재사용
export default Todo;
