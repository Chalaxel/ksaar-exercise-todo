import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, configureStore } from "@reduxjs/toolkit"


export interface TodoItem {
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
    add: (state, action: PayloadAction<string>) => {
      const newTodoItem: TodoItem = {
        id: state.uniqueTaskID++,
        task: action.payload,
        completed: false
      }
      state.items.push(newTodoItem)
      state.inputValue = ''
      return
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)

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
