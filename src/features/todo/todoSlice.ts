import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, configureStore } from "@reduxjs/toolkit"

export enum Filter {
  ALL = 'all',
  COMPLETED = 'completed',
  TODO = 'todo'
}

export interface TodoItem {
  id: number,
  task: string,
  completed: boolean
}
interface TodoState {
  items: TodoItem[],
  inputValue: string,
  uniqueTaskID: number,
  filter: Filter
}

const initialState: TodoState = {
  items: [
    {
      id: 0,
      task: 'Faire l\'exercice todo-list',
      completed: true
    }
  ],
  inputValue: '',
  uniqueTaskID: 1,
  filter: Filter.ALL
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
    check: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed
        }
        return item
      })
      return
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    },
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    }
  }
})

export const {
  add,
  remove,
  check,
  updateFilter,
  updateInputValue
} = todoSlice.actions

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
