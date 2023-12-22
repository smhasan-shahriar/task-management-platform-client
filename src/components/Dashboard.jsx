import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
        toast("Task Deleted");
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
      .then(async (res) => {
        if (res.data.modifiedCount > 0) {
          const taskResponse = await axiosPublic.get(`/view-task/${id}`);
          const {deadline} = taskResponse.data;
          const remaining = Math.ceil(
            (new Date(deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
          toast(`${newStatus === 'incomplete' ? `Task moved to To-Do List` : ``} ${newStatus === 'ongoing' ? `Task moved to Ongoing List` : ``} ${newStatus === 'complete' ? `Task moved to Complete List` : ``}. Deadline: ${remaining > 0 ? remaining : -(remaining)} ${remaining >= 0 && remaining <= 1 ? 'day left' : ''}${remaining > 1 ? 'days left' : ''}${remaining < 0 && remaining >= -1 ? 'day passed' : ''}${remaining <-1 ? 'days passed' : ''}`)
          toDoRefetch();
        }
      });
  };
  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className="max-w-[1440px] mx-auto px-10 mb-10">
          <div className="py-2  w-full flex items-center justify-between px-5 shadow-xl my-3 rounded-lg">
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
  let bg;
  let textColor;
  let tasksToMap = toDos;
  if (status === "incomplete") {
    text = "To-Do";
    bg = 'bg-gradient-to-r from-[#4E65FF] to-[#A1C4FD]'
    textColor = 'text-white'
    tasksToMap = toDos;
  }
  if (status === "ongoing") {
    text = "Ongoing";
    bg = 'bg-gradient-to-r from-[#FF61D2] to-[#FE9090]'
    textColor = 'text-white'
    tasksToMap = ongoing;
  }
  if (status === "complete") {
    text = "Complete";
    bg = 'bg-gradient-to-r from-[#02AABD] to-[#00CDAC]'
    textColor = 'text-white'
    tasksToMap = completed;
  }
  const addItemToSection = (id) => {
    axiosPublic
      .put(`/update-task-status/${id}`, { status: status })
      .then(async (res) => {
        if (res.data.modifiedCount > 0) {
          const taskResponse = await axiosPublic.get(`/view-task/${id}`);
          const {deadline} = taskResponse.data;
          const remaining = Math.ceil(
            (new Date(deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
          toast(`${status === 'incomplete' ? `Task moved to To-Do List` : ``} ${status === 'ongoing' ? `Task moved to Ongoing List` : ``} ${status === 'complete' ? `Task moved to Complete List` : ``}. Deadline: ${remaining > 0 ? remaining : -(remaining)} ${remaining >= 0 && remaining <= 1 ? 'day left' : ''}${remaining > 1 ? 'days left' : ''}${remaining < 0 && remaining >= -1 ? 'day passed' : ''}${remaining <-1 ? 'days passed' : ''}`)
          toDoRefetch();
        }
      });
  };
  return (
    <div
      ref={drop}
      className={`w-full min-h-[300px] shadow-xl pb-5 rounded-lg ${
        isOver ? "bg-violet-100" : ""
      }`}
    >
      <Header text={text} bg={bg} textColor={textColor} count={tasksToMap?.length}></Header>
      <div className={`flex flex-col justify-center items-center gap-5 mt-5`}>
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

const Header = ({ text, count, bg, textColor }) => {
  return (
    <div className={`text-center font-medium py-2 rounded-lg  ${bg} ${textColor} text-xl`}>
      <div className="flex justify-center items-center gap-3">
        <div>{text}</div>
        <div className="rounded-full w-7 h-7  bg-white text-[#2E3192]">{count}</div>
      </div>
    </div>
  );
};
