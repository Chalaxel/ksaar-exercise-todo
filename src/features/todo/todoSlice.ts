import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, configureStore } from "@reduxjs/toolkit"


interface TodoItem {
  id: number,
  task: string,
  completed: boolean
}
interface TodoState {
  items: TodoItem[],
  inputValue: string,
  uniqueTaskID: number
}

const initialState: TodoState = {
  items: [],
  inputValue: '',
  uniqueTaskID: 0
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, newTask) => {
      console.log(state.items)
      const newTodoItem: TodoItem = {
        id: state.uniqueTaskID++,
        task: newTask.payload,
        completed: false
      }
      state.items.push(newTodoItem)
      state.inputValue = ''
      return
    },
    remove: (state, index) => {
      return
    },
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    }
  }
})

export const { add, remove, updateInputValue } = todoSlice.actions

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
