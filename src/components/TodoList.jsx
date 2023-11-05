import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleCompleted,
} from "../slice/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);
  const loading = useSelector((state) => state.todos.loading);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  //   useEffect(() => {
  //     const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  //     if (storedTodos.length > 0) {
  //       dispatch(fetchTodos(storedTodos));
  //     }
  //   }, [dispatch]);

  //   useEffect(() => {
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //   }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo({ title: newTodo, completed: false }));
      setNewTodo("");
    }
  };

  const handleEditTodo = (id, newTitle) => {
    dispatch(editTodo({ id, title: newTitle }));
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleCompleted = (id, completed) => {
    dispatch(toggleCompleted({ id, completed: !completed }));
  };

  //   const handleDelete = (id) => {
  //     dispatch(deleteTodo(id));
  //   };

  return (
    // <div>
    //   <h2>To-Do List</h2>
    //   {loading === "loading" ? (
    //     <p>Loading...</p>
    //   ) : loading === "failed" ? (
    //     <p>Error: Unable to fetch data</p>
    //   ) : (
    //     <ul>
    //       {todos.map((todo) => (
    //         <li key={todo.id}>
    //           {todo.title}
    //           <button onClick={() => handleDelete(todo.id)}>Delete</button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div className="App">
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <input
                type="text"
                value={todo.title}
                onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                onBlur={() => setEditingTodo(null)}
              />
            ) : (
              <span
                onClick={() => setEditingTodo(todo.id)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button
              onClick={() => handleToggleCompleted(todo.id, todo.completed)}
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
