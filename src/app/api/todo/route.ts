import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Todo from "../../models/todo";
import connectDB from "@/app/lib/db/mongodb";

export async function POST(req: NextRequest) {
  const { bookmark, id, text, state } = await req.json();
  if (req.method === "POST") {
    try {
      await connectDB();
      await Todo.create({ bookmark, id, text, state }); //문서 생성하고 바로 DB에 저장
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
  const todos = await Todo.find();
  return NextResponse.json(todos);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = await req.json();
  if (req.method === "DELETE") {
    await connectDB();
    await Todo.findOneAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const newTodo = await req.json();
  await connectDB();
  console.log(newTodo);

  const filter = { id: newTodo.id };
  const update = { text: newTodo.editedTask, bookmark: newTodo.bookmark, state: newTodo.state };
  await Todo.updateMany(filter, update, { new: true });
  //Todo.findOneAndUpdate
  return NextResponse.json({ message: "Todo updated" }, { status: 200 });
}
