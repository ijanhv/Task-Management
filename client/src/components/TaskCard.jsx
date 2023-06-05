import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdateTaskModal from "./UpdateTaskModal";
import { AiOutlineCheck } from "react-icons/ai";
import newRequest from "../utils/newRequest";

const TaskCard = ({ id, title, description, status }) => {
  const queryClient = useQueryClient();
  const [update, setUpdate] = useState(false);

  const mutation = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (task) => {
      return newRequest.delete(`/tasks/${id}`, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    mutation.mutate(id);
  };

  const mutationUpdate = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: (task) => {
      return newRequest.put(`/tasks/${id}`, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleMarkAsCompleted = (e) => {
    e.preventDefault();
 
    mutationUpdate.mutate({ status: true });
  };

  return (
    <div className="cursor-pointer hover:shadow-xl transition-all duration-300 w-full">
      <Tilt>
        <div className="border border-b-4 border-r-4 h-[170px] sm:h-[200px] w-full transition-all duration-400 border-textGreen p-5 rounded-2xl  ">
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-lg flex gap-2">
                {title}
              </h3>
              <div className="flex flex-row gap-3">
                <AiOutlineEdit
                  onClick={() => setUpdate(true)}
                  className="hover:text-textGreen"
                />
                <RiDeleteBin6Line
                  onClick={handleDelete}
                  className="hover:text-textGreen"
                />
              </div>
            </div>
            <p className="mt-2 text-secondary font-bodyFont text-[13px]">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <p
              className={`text-xs font-medium mr-2 px-2.5 py-0.5 bg-opacity-70 items-center ${
                status ? "bg-green-500" : "bg-blue-400"
              } rounded-full  border border-indigo-300 `}
            >
              {status === true ? "Completed" : "Pending"}
            </p>
            {status === false && (
              <div
                onClick={handleMarkAsCompleted}
                className="text-textLight text-sm flex gap-2 items-center hover:text-textGreen rounded-full"
              >
                {" "}
                <AiOutlineCheck /> Mark as Completed
              </div>
            )}
          </div>
        </div>
      </Tilt>
      <UpdateTaskModal
        show={update}
        setShow={setUpdate}
        id={id}
        title={title}
        description={description}
        status={status}
      />
    </div>
  );
};

export default TaskCard;
