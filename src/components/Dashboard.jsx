import React from "react";
import useAuth from "../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
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
  console.log(toDoList);
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-2">
      <div className="py-2 bg-gradient-to-r from-blue-500 to-violet-500 w-full flex items-center justify-between px-5">
        <p className="text-white font-bold text-2xl">Dashboard</p>
        <div className="flex items-center gap-4">
          <p className="text-white font-medium">{user?.displayName}</p>
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user.photoURL}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            To Do : {toDoList?.length}
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            {toDoList?.map((task) => (
              <div key={task._id} className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <Link to="updatetask">
                      <button className="btn btn-square btn-sm">
                        <FaEdit className="text-xl text-yellow-500" />
                      </button>
                    </Link>

                    <button className="btn btn-square btn-sm">
                      <MdDelete className="text-xl text-red-600" />
                    </button>
                  </div>
                  <p className="font-bold text-lg">{task.title}</p>
                  <p className="font-medium">{task.description}</p>
                  <div className="flex justify-start">
                    <p>{task.deadline} ({Math.floor(((new Date(task.deadline)).getTime() - (new Date()).getTime())/((1000 * 60 * 60 * 24)))} days Left) </p>
                    <span className="bg-gray-200 px-2 py-1">{task.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            Ongoing
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <FaEdit className="text-xl text-yellow-500" />
                  </button>
                  <button className="btn btn-square btn-sm">
                    <MdDelete className="text-xl text-red-600" />
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                  <p>date</p>
                  <p className="">priority</p>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <FaEdit className="text-xl text-yellow-500" />
                  </button>
                  <button className="btn btn-square btn-sm">
                    <MdDelete className="text-xl text-red-600" />
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                  <p>date</p>
                  <p className="">priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            Completed
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <FaEdit className="text-xl text-yellow-500" />
                  </button>
                  <button className="btn btn-square btn-sm">
                    <MdDelete className="text-xl text-red-600" />
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                  <p>date</p>
                  <p className="">priority</p>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <FaEdit className="text-xl text-yellow-500" />
                  </button>
                  <button className="btn btn-square btn-sm">
                    <MdDelete className="text-xl text-red-600" />
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                  <p>date</p>
                  <p className="">priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
