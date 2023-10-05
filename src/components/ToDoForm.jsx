import { useEffect, useRef, useState } from "react"
import { useToDo } from "../context";

function ToDoForm() {
    const [todo, setTodo] = useState([])
    const { addToDo } = useToDo()
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!todo) return
        addToDo(todo)
        setTodo("")
    }

    useEffect(() => {
        // Focus the input field when the component mounts
        inputRef.current.focus();
    }, [handleSubmit]);

    return (
        <form onSubmit={handleSubmit} className="w-100 d-flex justify-content-center align-items-center">
            <input className="form-control"
                type="text"
                name="todo"
                id="todo"
                autoFocus
                value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)} />
            <button className="btn btn-success btn-rounded" type="submit">Add</button>
        </form>
    )
}

export default ToDoForm