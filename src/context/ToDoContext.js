import { createContext, useContext } from "react"

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            task: "",
            completed: false
        },
    ],
    addToDo: (todo) => {},
    updateToDo: (id, todo) => {},
    deleteToDo: (id) => {},
    isCompleted: (id) => {}
})

export const useToDo = () => {
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider