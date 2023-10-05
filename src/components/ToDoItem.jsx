import { useState } from "react"
import { useToDo } from "../context"

function ToDoItem({ todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.task)
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const { updateToDo, deleteToDo, isCompleted } = useToDo()

  const handleEdit = () => {
    setIsTodoEditable(!isTodoEditable)
    updateToDo(todo.id, { ...todo, task: todoMsg })
  }

  const handleDelete = () => {
    deleteToDo(todo.id)
  }

  const markAsComplete = () => {
    isCompleted(todo.id)
  }

  return (
    <div className={`${todo.completed ? "text-success" : "text-primary"} rounded my-3 p-2 border border-primary d-flex`}>
      <input type="checkbox" checked={todo.completed} onChange={markAsComplete} />
      <input type="text"
        className={`w-75 mx-2 bg-transparent ${isTodoEditable ? "border border-dark" : "border border-0"} ${todo.completed ? "text-success font-italic text-decoration-line-through" : "text-primary"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button className="btn btn-sm btn-rounded btn-primary me-2" type="button" onClick={handleEdit}>{`${isTodoEditable ? "Save" : "Edit"}`}</button>
      <button className="btn btn-sm btn-rounded btn-danger" type="button" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ToDoItem