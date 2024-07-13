import { createSlice, configureStore } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
  }, reducers: {
    add: (state) => {
      return
    },
    remove: (state) => {
      return
    },
  }
})

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
