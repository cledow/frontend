"use client";

import { useEffect, useState } from "react";
import AddTodo from "../addTodo/addTodo";
import Todo from "../todo/todo";
import styles from "./todoList.module.css";
import { getAllTodos } from "@/app/api/todo/api";


interface Todo {
  id: any;
  text: string;
  state: string;
  bookmark: boolean;
}
//타입 불일치 오류로, setTodos 함수의 타입과 todo 변수의 타입이 호환되지 않아 발생
//이 오류를 해결하려면 setTodos 함수에 전달되는 배열의 타입과 todo 변수의 타입이 일치하도록 해야 함.
//setTodos 함수가 받아들이는 배열 타입을 정확하게 지정

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = (todo: any) => setTodos([...todos, todo]);
  const handleDelete = (deleted: any) =>
    setTodos(todos.filter((t: any) => t.id !== deleted.id));
  const handleState = (updated: any) =>
    setTodos(todos.map((t: any) => (t.id === updated.id ? updated : t)));
  const handleEdit = (edited: any) =>
    setTodos(todos.map((t: any) => (t.id === edited.id ? edited : t)));

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTodos = await getAllTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchData();
  }, []); 

  // function getFilteredItems(todos: any, filter: string) {
  //   if (!todos) return null;
  //   if (filter === "모두 보기") {
  //     return todos;
  //   } else return todos.filter((todo: any) => todo.state === filter);
  // }

  // const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.addList}>
        {todos.map((item: any) => (
          <Todo
            key={item._id}
            todo={item}
            onDelete={handleDelete}
            onUpdate={handleState}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      <div className={styles.middleSpace}></div>  
      <div className={styles.addForm}>
        <AddTodo onAdd={handleAdd} />
      </div>
    </section>
  );
}
