import { getAuth } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useTask from "../hooks/useTask";

const CreateTask = () => {
  const currentDate = new Date();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const {tasks, setTasks} = useTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const inputDate = new Date(data.deadline);
    if (inputDate < currentDate) {
      toast("Deadline Should be in the future");
      return;
    }
    const newTask = {
        userEmail: user?.email,
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: 'incomplete'
    }
    setTasks(prev => {
      const list = [...prev, newTask]
      return list;
    })
    axiosPublic.post('/create-new-task', newTask)
    .then(res => {
        if(res.data.insertedId) {
            toast('Task Added to TO-DO list successfully')
        }
    })

  };
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-2">
        <Helmet>
        <title>Swift Task Planner | Create Task</title>
      </Helmet>
      <h2 className="text-center font-bold text-3xl">Create Task</h2>
      <div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              {...register("description")}
              type="text"
              placeholder="Description"
              className="input input-bordered"
              required
            />
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                {...register("deadline")}
                type="date"
                placeholder="Deadline"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register("priority")}
                className="select select-bordered w-full"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <input
            className="btn btn-primary mt-5"
            type="submit"
            value="Create New Task"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
