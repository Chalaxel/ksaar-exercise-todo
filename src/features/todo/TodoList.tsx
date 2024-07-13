import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'

const Filters = () => {
  return (
    <div className="flex space-x-1 my-4">
      <Button variant="outline" className="hover:text-primary">
        Aucun filtre
      </Button>
      <Button variant="outline" className="hover:text-primary">
        Completé
      </Button>
      <Button variant="outline" className="hover:text-primary">
        A faire
      </Button>
    </div>
  )
}

const TodoItem = ({ title }: {title: string}) => {
  return (
    <div className="h-12 px-3 bg-gray-100 rounded-xl flex justify-between items-center">
      <Checkbox />
      {title}
      <Button variant="outline" size="icon" className="hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

const InputTask = () => {
  return (
    <div className="flex space-x-1 my-4">
      <Input />
      <Button>Ajouter</Button>
    </div>
  )
}

export const TodoList = () => {
  const temp_list = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: false },
    { id: 3, title: "Todo 3", completed: false },
  ]
  return (
    <div className="h-screen max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1>Todo List</h1>
      <Filters />
      <ul className="space-y-3">
        {temp_list.map(todo => (
          <TodoItem key={todo.id} title={todo.title} />
        ))}
      </ul>
      <InputTask />
    </div>
  )
}
