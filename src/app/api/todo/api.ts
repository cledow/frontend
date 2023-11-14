export const getAllTodos = async () => {
  const res = await fetch("http://localhost:3000/api/todo", {
    cache: "no-store",
  });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: any) => {
  const res = await fetch("api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  // const newTodo = await res.json();
  // return newTodo;
};

export const editTodo = async (newTodo:any) => {
  console.log(newTodo)
  await fetch("api/todo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
};

export const deleteTodo = async (id: string) => {
  await fetch("api/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};
