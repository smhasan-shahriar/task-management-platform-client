import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateTask = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {id} = useParams();
  const getTask = async () => {
    const response = await axiosPublic.get(`/view-task/${id}`)
    return response.data;
  }
  const { data: currentTask } = useQuery({
    queryKey: ["currentTask"],
    queryFn: getTask
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleUpdate= (e) => {
    e.preventDefault();
    const form = e.target;
    const inputDate = new Date(form.deadline.value);
    if (inputDate < currentDate) {
        toast("Deadline Should not be in the past");
        return;
      }
      const updatedTask = {
        title: form.title.value,
        description: form.description.value,
        deadline: form.deadline.value,
        priority: form.priority.value
    }
    axiosPublic.put(`/update-task/${id}`, updatedTask)
    .then(res => {
      if(res.data.modifiedCount > 0){
        toast('Task successfully updated')
        navigate('/')
      }
    })
  };
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-2">
        <Helmet>
        <title>Swift Task Planner | Update Task</title>
      </Helmet>
      <h2 className="text-center font-bold text-3xl">Update Task</h2>
      <div>
        <form className="card-body" onSubmit={handleUpdate}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title")}
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              defaultValue={currentTask?.title}
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
              name="description"
              placeholder="Description"
              className="input input-bordered"
              defaultValue={currentTask?.description}
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
                name="deadline"
                placeholder="Deadline"
                className="input input-bordered"
                defaultValue={currentTask?.deadline}
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select {...register("priority")} name="priority"  className="select select-bordered w-full">
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <input
            className="btn btn-primary mt-5"
            type="submit"
            value="Update Task"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
