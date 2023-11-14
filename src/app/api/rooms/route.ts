import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Room from "../../models/room";
import connectDB from "@/app/lib/db/mongodb";

export async function POST(req: NextRequest) {
  const { id ,roomName, backgroundImage, deadLine, studyTime, state, date } = await req.json();
  if (req.method === "POST") {
    try {
      await connectDB();
      await Room.create({ id, roomName, backgroundImage, deadLine, studyTime, state, date }); //문서 생성하고 바로 DB에 저장
      //create 할 때 , 만들어둔 모델 속 인자들을 전부 빠짐없이 넣어주어야만 한다.
      return NextResponse.json({
        msg: ["Message sent successfully"],
        success: true,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        let errorList = [];
        for (let e in error.errors) {
          errorList.push(error.errors[e].message);
        }
        return NextResponse.json({ msg: errorList });
      } else {
        return NextResponse.json({ msg: ["Unable to send message."] });
      }
    }
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  await connectDB();
  await Room.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}