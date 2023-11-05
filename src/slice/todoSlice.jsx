import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Fetch data from api  */
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
});

const getInitialTodo = () => {
  // getting todo list from local storage if it is not empty
  const localTodoList = window.localStorage.getItem("todoList");

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem("todoList", []);
  return [];
};

const initialValue = {
  filterStatus: "all",
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

// export const todoSlice = createSlice({
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTodos.pending, (state) => {
//         state.loading = "loading";
//       })
//       .addCase(fetchTodos.fulfilled, (state, action) => {
//         state.loading = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchTodos.rejected, (state, action) => {
//         state.loading = "failed";
//         state.error = action.error.message;
//       });
// builder.addCase(updateTodo.fulfilled, (state, action) => {
//   const updatedTodo = action.payload;
//   const index = state.data.findIndex((todo) => todo.id === updatedTodo.id);
//   if (index !== -1) {
//     state.data[index] = updatedTodo;
//   }
// });

// builder.addCase(deleteTodo.fulfilled, (state, action) => {
//   const deletedTodoId = action.payload;
//   state.data = state.data.filter((todo) => todo.id !== deletedTodoId);
// });
//   },
// });

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
