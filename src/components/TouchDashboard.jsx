import React, { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTask from "../hooks/useTask";
import { toast } from "react-toastify";
import { TouchBackend } from "react-dnd-touch-backend";

const TouchDashboard = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [toDos, setToDos] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const getToDoTasks = async () => {
    const response = await axiosPublic.get(
      `/all-to-do-tasks?email=${user?.email}`
    );
    return response.data;
  };
  const { data: toDoList, refetch: toDoRefetch } = useQuery({
    queryKey: ["allToDoTasks", user?.email],
    enabled: !loading,
    queryFn: getToDoTasks,
  });

  useEffect(() => {
    const filteredToDos = toDoList?.filter(
      (task) => task.status === "incomplete"
    );
    const filteredOngoing = toDoList?.filter(
      (task) => task.status === "ongoing"
    );
    const filteredCompleted = toDoList?.filter(
      (task) => task.status === "complete"
    );

    setToDos(filteredToDos);
    setOngoing(filteredOngoing);
    setCompleted(filteredCompleted);
  }, [toDoList]);
  const handleRemove = async (id) => {
    axiosPublic.delete(`/delete-task/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("task deleted");
        toDoRefetch();
      }
    });
  };
  const statuses = ["incomplete", "ongoing", "complete"];

  // const getOngoingTasks = async () => {
  //   const response = await axiosPublic.get(
  //     `/all-to-do-tasks?email=${user?.email}&status=ongoing`
  //   );
  //   return response.data;
  // };
  // const getCompletedTasks = async () => {
  //   const response = await axiosPublic.get(
  //     `/all-to-do-tasks?email=${user?.email}&status=complete`
  //   );
  //   return response.data;
  // };

  // const { data: ongoingList, refetch: ongoingRefetch } = useQuery({
  //   queryKey: ["allOngoingTasks", user?.email],
  //   enabled: !loading,
  //   queryFn: getOngoingTasks,
  // });
  // const { data: completedList, refetch: completedRefetch } = useQuery({
  //   queryKey: ["allCompletedTasks", user?.email],
  //   enabled: !loading,
  //   queryFn: getCompletedTasks,
  // });
  return (
    <>
  
    <DndProvider  backend={TouchBackend} options={{enableMouseEvents: true}}>
      <div className="min-h-screen max-w-[1440px] mx-auto px-2 hidden">
        <div className="py-2  w-full flex items-center justify-between px-5 shadow-xl my-3 rounded-full">
          <p className=" font-bold text-2xl">Dashboard</p>
          <div className="flex items-center gap-4">
            <p className=" font-medium">{user?.displayName}</p>
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={user.photoURL}
              alt=""
            />
          </div>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          {statuses.map((status, index) => (
            <Section
              key={index}
              status={status}
              tasks={toDoList}
              toDos={toDos}
              ongoing={ongoing}
              completed={completed}
              handleRemove={handleRemove}
              axiosPublic = {axiosPublic}
              toDoList = {toDoList}
              toDoRefetch = {toDoRefetch}
            ></Section>
          ))}
        </div>
      </div>
    </DndProvider>
    
    </>
    
  );
};

export default TouchDashboard;

const Section = ({
  status,
  tasks,
  toDos,
  ongoing,
  completed,
  handleRemove,
  axiosPublic,
  toDoList,
  toDoRefetch
}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  let text = "todo";
  let tasksToMap = toDos;
  if (status === "incomplete") {
    text = "To Do";
    tasksToMap = toDos;
  }
  if (status === "ongoing") {
    text = "Ongoing";
    tasksToMap = ongoing;
  }
  if (status === "complete") {
    text = "Complete";
    tasksToMap = completed;
  }
  const addItemToSection = (id) => {
    axiosPublic.put(`/update-task-status/${id}`, {status: status})
    .then(res => {
      if(res.data.modifiedCount > 0){
        toast(`task moved to ${status}`);
        toDoRefetch()
      }
    })
  }
  return (
    <div ref={drop} className={`w-full shadow-xl pb-5 rounded-lg ${isOver ? "bg-violet-200" : ""}`}>
      <Header text={text} count={tasksToMap?.length}></Header>
      <div className="flex flex-col justify-center items-center gap-5 mt-5">
        {tasksToMap?.length > 0 &&
          tasksToMap?.map((task) => (
            <Task key={task._id} task={task} handleRemove={handleRemove}></Task>
          ))}
      </div>
    </div>
  );
};

const Header = ({ text, count }) => {
  return (
    <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
      {text} {count}
    </div>
  );
};
