import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI as string);
      // readyState===0 즉, 연결되어 있지 않으면 연결
      // TS는 환경변수의 타입을 알지 못해서 string 명시
      console.log("db connected");
    }
  } catch (error) {
    console.log("db Connect Error:", error);
  }
};

export default connectDB;
