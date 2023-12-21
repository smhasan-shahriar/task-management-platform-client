import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useTask from '../hooks/useTask';

const Demo = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const {tasks: toDoList} = useTask();
    const [toDos, setToDos] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([])
    console.log(toDoList)
  
    useEffect(()=> {
      const filteredToDos = toDoList.filter(task => task.status === "incomplete")
      const filteredOngoing = toDoList.filter(task => task.status === "ongoing")
      const filteredCompleted = toDoList.filter(task => task.status === "complete")
  
  
      setToDos(filteredToDos);
      setOngoing(filteredOngoing);
      setCompleted(filteredCompleted);
    },[toDoList])
    const statuses = ["incomplete", "ongoing", "complete"];
    
    return (
        <div>
            {
                statuses.map((status, index) => (
                    <Section key={index} status={status}>

                    </Section>
                ))
            }
        </div>
    );
};

export default Demo;
const Section = ({status}) => {
    return(
      <>
       <h2>{status}</h2>
      </>
    )
  }