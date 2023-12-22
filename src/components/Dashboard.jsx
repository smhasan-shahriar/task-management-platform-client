import React, { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTask from "../hooks/useTask";
import { toast } from "react-toastify";
import { TouchBackend } from "react-dnd-touch-backend";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 780;
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
  const handleUpdate = (id) => {
    navigate(`/updatetask/${id}`);
  };
  const statuses = ["incomplete", "ongoing", "complete"];
  const statusChange = (id, newStatus) => {
    axiosPublic
      .put(`/update-task-status/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast(`task moved to ${newStatus}`);
          toDoRefetch();
        }
      });
  };
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
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className="max-w-[1440px] mx-auto px-10 mb-10">
          <div className="py-2  w-full flex items-center justify-between px-5 shadow-xl my-3 rounded-full">
            <p className=" font-bold text-2xl">Dashboard</p>
            <div className="flex items-center gap-4">
              <Link to="createTask" className="btn">
                +
              </Link>
              <p className=" font-medium">{user?.displayName}</p>
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.photoURL}
                alt=""
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {statuses.map((status, index) => (
              <Section
                key={index}
                status={status}
                tasks={toDoList}
                toDos={toDos}
                ongoing={ongoing}
                completed={completed}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
                axiosPublic={axiosPublic}
                toDoList={toDoList}
                toDoRefetch={toDoRefetch}
                statusChange={statusChange}
              ></Section>
            ))}
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default Dashboard;

const Section = ({
  status,
  tasks,
  toDos,
  ongoing,
  completed,
  handleRemove,
  handleUpdate,
  axiosPublic,
  toDoList,
  toDoRefetch,
  statusChange,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
    axiosPublic
      .put(`/update-task-status/${id}`, { status: status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast(`${status === 'incomplete' ? `Task moved to To Do List` : ``} ${status === 'ongoing' ? `Task moved to Ongoing List` : ``} ${status === 'complete' ? `Task moved to Complete List` : ``}`)
          toDoRefetch();
        }
      });
  };
  return (
    <div
      ref={drop}
      className={`w-full min-h-[300px] shadow-xl pb-5 rounded-lg ${
        isOver ? "bg-violet-200" : ""
      }`}
    >
      <Header text={text} count={tasksToMap?.length}></Header>
      <div className="flex flex-col justify-center items-center gap-5 mt-5">
        {tasksToMap?.length > 0 &&
          tasksToMap?.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              statusChange={statusChange}
            ></Task>
          ))}
        {tasksToMap?.length === 0 && (
          <div className="flex w-full min-h-[200px] justify-center items-center">
            <img src={"https://i.ibb.co/HVbwX61/icons8-select-none-96.png"} />
          </div>
        )}
      </div>
    </div>
  );
};

const Header = ({ text, count }) => {
  return (
    <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
      <div className="flex justify-center items-center gap-3">
        <div>{text}</div>
        <div className="rounded-full w-7 h-7  bg-white text-blue-700">{count}</div>
      </div>
    </div>
  );
};
