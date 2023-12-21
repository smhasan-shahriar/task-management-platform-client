import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Task = ({ task, onEdit, onDelete }) => {


  return (
    <div
     
      className={`card w-96 bg-base-100 shadow-xl`}
    >
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => onEdit(task)}
          >
            <FaEdit className="text-xl text-yellow-500" />
          </button>
          <button
            className="btn btn-square btn-sm"
            onClick={() => onDelete(task)}
          >
            <MdDelete className="text-xl text-red-600" />
          </button>
        </div>
        <p className="font-bold text-lg">{task.title}</p>
        <p className="font-medium">{task.description}</p>
        <div className="flex justify-start items-center gap-2">
          <p>
            {task.deadline} (
            {Math.floor(
              (new Date(task.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days Left){" "}
          </p>
          <span className="bg-gray-200 px-2 py-1">{task.priority}</span>
        </div>
      </div>
    </div>
  );
};

export default Task;
