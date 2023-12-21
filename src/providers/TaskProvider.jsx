import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const TaskContext = createContext(null)


const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        const fetchData = async () => {
            const response = await axiosPublic.get( `/all-to-do-tasks?email=${user?.email}`)
            setTasks(response.data)
        }
        fetchData();
    },[user?.email, axiosPublic])
    const myRef = {
        tasks, setTasks
    }
    return (
        <TaskContext.Provider value={myRef}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;