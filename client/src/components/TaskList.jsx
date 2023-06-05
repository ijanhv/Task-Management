import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newREquest";
import TaskCard from "./TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import AddTaskModal from "./AddTaskModal";

const TaskList = () => {
  const [modal, setModal] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      newRequest.get("/tasks").then((res) => {
        return res.data;
      }),
  });

  console.log(data);
  return (
    <div className="max-w-contentContainer mx-auto py-5 lgl:py-32 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl text-textLight font-semibold ">My Tasks</h1>
        <button
          onClick={() => setModal(true)}
          className="px-4 py-2 flex gap-2 items-center rounded-full text-textGreen text-[13px] border border-textGreen hover:bg-hoverColor transform hover:scale-110 transition-all duration-300"
        >
          Add Task <AiOutlinePlus />
        </button>
      </div>

      <div className="w-full flex">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-7">
            {data.data.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
              />
            ))}
          </div>
        )}
      </div>
      <AddTaskModal show={modal} setShow={setModal} />
    </div>
  );
};

export default TaskList;
