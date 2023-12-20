import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateTask = () => {
    const currentDate = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const inputDate = new Date(data.deadline);
    if (inputDate < currentDate) {
        toast("Deadline Should be in the future");
        return;
      }
  };
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-2">
        <Helmet>
        <title>Swift Task Planner | Update Task</title>
      </Helmet>
      <h2 className="text-center font-bold text-3xl">Update Task</h2>
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
              <select {...register("priority")}  className="select select-bordered w-full">
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
