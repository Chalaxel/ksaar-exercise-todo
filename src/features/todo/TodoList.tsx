import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks"
import type { RootState, TodoItem as TodoItemType } from "@/features/todo/todoSlice"
import { add, check, Filter, remove, updateFilter, updateInputValue } from "@/features/todo/todoSlice"

const Filters = () => {
  const todoFilter = useAppSelector((state: RootState) => state.todo.filter);
  const dispatch = useAppDispatch();
  const handleNoFilter = () => {
    dispatch(updateFilter(Filter.ALL))
  }
  const handleCompletedFilter = () => {
    dispatch(updateFilter(Filter.COMPLETED))
  }
  const handleTodoFilter = () => {
    dispatch(updateFilter(Filter.TODO))
  }
  return (
    <div className="flex space-x-1 my-4">
      <Button
        onClick={handleNoFilter}
        variant={todoFilter === Filter.ALL ? "default" : "outline"}
      >
        Aucun filtre
      </Button>
      <Button
        onClick={handleCompletedFilter}
        variant={todoFilter === Filter.COMPLETED ? "default" : "outline"}
      >
        Completé
      </Button>
      <Button
        onClick={handleTodoFilter}
        variant={todoFilter === Filter.TODO ? "default" : "outline"}
      >
        A faire
      </Button>
    </div>
  )
}

const TodoItem = ({ item }: {item: TodoItemType}) => {
  const dispatch = useAppDispatch();

  const handleRemoveTask = () => {
    dispatch(remove(item.id))
  }
  const handleCheckTask = () => {
    dispatch(check(item.id))
  }

  return (
    <div className="h-12 px-3 bg-gray-100 rounded-xl flex justify-between items-center">
      <Checkbox checked={item.completed} onCheckedChange={handleCheckTask}/>
      {item.task}
      <Button
        onClick={handleRemoveTask}
        variant="outline"
        size="icon"
        className="hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

const InputTask = () => {
  const inputValue = useAppSelector((state: RootState) => state.todo.inputValue);
  const dispatch = useAppDispatch();
  const handleAddTask = () => {
    dispatch(add(inputValue))
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInputValue(e.target.value));
  };

  return (
    <div className="flex space-x-1 my-4">
      <Input value={inputValue} onChange={handleInputChange} />
      <Button onClick={handleAddTask}>Ajouter</Button>
    </div>
  )
}

export const TodoList = () => {
  const todoFilter = useAppSelector((state: RootState) => state.todo.filter);
  const todo = useAppSelector((state: RootState) => state.todo.items);
  return (
    <div className="h-screen max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1>Ksaar - Exercice Redux - TODO List</h1>
      <Filters />
      <ul className="space-y-3">
        {todo
          .filter(item => {
            switch (todoFilter) {
              case Filter.ALL:
                return true
              case Filter.COMPLETED:
                return item.completed
              case Filter.TODO:
                return !item.completed
            }
            return true
          })
          .map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
      <InputTask />
    </div>
  )
}
