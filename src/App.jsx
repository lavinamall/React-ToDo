import { useEffect, useState } from "react"
import { ToDoForm, ToDoItem } from "./components"
import { ToDoProvider } from "./context"

function App() {
  // all the todos from context & stored in state
  const [todos, setTodos] = useState([])

  // define functionality of all the methods listed in context
  const addToDo = (todo) => {
    if (todo && todo.length > 0)
      setTodos((prev) => [...prev, { id: Date.now(), completed: false, task: todo }])
  }

  const updateToDo = (id, todo) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo)))
  }

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const isCompleted = (id) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? { ...eachTodo, completed: !eachTodo.completed } : eachTodo)))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todoList"))
    if (todos && todos.length > 0) {
      setTodos(todos);
      todos.sort((a,b) => a.completed - b.completed);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos))
  }, [todos])

  return (
    <ToDoProvider value={{ todos, addToDo, updateToDo, deleteToDo, isCompleted }}>
      <div className="container-fluid mt-5">
        <h2 className="text-center font-weight-bold p-2">ToDo List</h2>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-lg-8">

            <ToDoForm />

            {todos.map((todo) => (
              <div key={todo.id}>
                <ToDoItem todo={todo} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
