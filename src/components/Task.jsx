import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Task = ({ task, handleRemove, handleUpdate, statusChange }) => {
  const [{ isDragging }, drag] = useDrag(()=> ({
    type: 'task',
    item: {id: task._id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  const remaining = Math.ceil(
    (new Date(task.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const statuses = ["incomplete", "ongoing", "complete"];
  const changeableStatuses = statuses.filter(item => item !== task.status)
  return (
    <div ref={drag} className={`card w-full bg-base-100 shadow-xl untouchable cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}>
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => handleUpdate(task._id)}
          >
            <FaEdit className="text-xl text-yellow-500" />
          </button>
          <button
            className="btn btn-square btn-sm"
            onClick={() => handleRemove(task._id)}
          >
            <MdDelete className="text-xl text-red-600" />
          </button>
        </div>
        <p className="font-bold text-lg">{task.title}</p>
        <p className="font-medium">{task.description}</p>
        <div className="flex justify-start items-center gap-2">
          <p className={`font-medium ${remaining <= 2 && `text-red-600`} ${remaining < 4 && remaining > 2 && `text-yellow-600`} ${remaining > 4 && `text-green-600`} ${task.status === 'complete' && 'text-black'}`}>
            Deadline: {task.deadline} (
            {remaining > 0 ? remaining : -(remaining)}{" "}
            {`${remaining >= 0 && remaining <= 1 ? 'day left' : ''}`}{`${remaining > 1 ? 'days left' : ''}`}{`${remaining < 0 && remaining >= -1 ? 'day passed' : ''}`}{`${remaining <-1 ? 'days passed' : ''}`}){" "}
          </p>
          <span className="bg-gray-200 px-2 py-1">{task.priority}</span>
        </div>
        <div className="flex gap-2 flex-row md:flex-col">
          {changeableStatuses.map((item,index) => (
            <button onClick={() => statusChange(task._id, item)} className="btn btn-primary lg:hidden" key={index}>{item === 'incomplete' && 'Set to To Do'} {item === 'ongoing' && 'Set to Ongoing'} {item === 'complete' && 'Set to Complete'}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
