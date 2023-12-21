import { useContext } from "react"
import { TaskContext } from "../providers/TaskProvider"

const useTask = () => {
    return useContext(TaskContext)
}

export default useTask;