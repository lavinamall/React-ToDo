import { useEffect, useState } from "react"
import { useToDo } from "../context"
import dateFormat from "dateformat"

function ToDoItem({ todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.task)
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const { updateToDo, deleteToDo, isCompleted } = useToDo()

  const milisToDate = (mili) => new Date(mili)
  const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(todo.id)); // Initial elapsed time

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

  function calculateElapsedTime(timestamp) {
    const currentTime = new Date();
    const elapsedTimeInMillis = currentTime - milisToDate(timestamp);
    const elapsedTimeInSeconds = elapsedTimeInMillis / 1000;
    return elapsedTimeInSeconds;
  }

  // Function to format elapsed time with appropriate units
  function formatElapsedTime(elapsedTime) {
    if (elapsedTime >= 3600) {
      const hours = Math.floor(elapsedTime / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
    else if (elapsedTime >= 60) {
      const minutes = Math.floor(elapsedTime / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
    else {
      return `${elapsedTime.toFixed(1)} second${elapsedTime !== 1 ? "s" : ""}`;
    }
  }


  useEffect(() => {
    // Update the elapsed time every second
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${todo.completed ? "text-success" : "text-primary"} rounded my-3 p-2 border border-primary bg-light-subtle`}>

      <div className="d-flex align-items-center">
        <input type="checkbox" checked={todo.completed} onChange={markAsComplete} />

        <p className={`d-flex align-items-center mx-2 my-0 p-0 bg-transparent ${isTodoEditable ? "d-none" : "border border-0"} 
        ${todo.completed ? "text-success font-italic text-decoration-line-through" : "text-primary"}`}>{todoMsg}</p>
      </div>

      <input type="text"
        className={`w-75 mx-2 bg-transparent ${isTodoEditable ? "border border-dark" : "d-none border border-0"} ${todo.completed ? "text-success font-italic text-decoration-line-through" : "text-primary"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* <div className="d-flex justify-content-between align-items-center"> */}
      <div className={`d-flex justify-content-between align-items-center ${todo.completed ? "d-none" : ""}`}>
        <i className="text-muted mr-1" style={{ fontSize: '14px' }}>
          added  <span className="d-none d-sm-inline">on: {dateFormat(milisToDate(todo.id), "")} | </span>
          {formatElapsedTime(elapsedTime)} ago
        </i>

        <div>
          <button className={`btn btn-sm btn-rounded btn-primary mx-1 ${todo.completed ? "d-none" : ""}`}
            type="button" onClick={handleEdit}>
            {`${isTodoEditable ? "Save" : "Edit"}`}
          </button>
          <button className="btn btn-sm btn-rounded btn-danger mx-2" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>

      </div>

    </div>
  )
}

export default ToDoItem