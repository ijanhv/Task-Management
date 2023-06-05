import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import newRequest from "../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UpdateTaskModal = ({ show, setShow, id, title, description, status }) => {
  const modalRef = useRef(null);
  const [task, setTask] = useState({
    title: title,
    description: description,
    status: status,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: (task) => {
      return newRequest.put(`/tasks/${id}`, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, status } = task;
    mutation.mutate({ title, description, status });
    setShow(false);
  };

  return (
    <div>
      <section
        className={`fixed top-0 right-0 w-full h-full bg-[#00000090] z-10 place-items-center flex justify-center transition-all duration-500 ${
          show ? "flex" : "hidden"
        }`}
      >
        <div className=" flex justify-center items-center ">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: "-150px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="w-[300px] md:w-[600px] border border-textGreen h-[500px] rounded-lg bg-bodyColor p-4 md:p-8  flex flex-col items-center relative"
          >
            <h2 className="w-full text-center text-2xl font-bold pb-3">
              Update Task
            </h2>
            <form onSubmit={handleSubmit} className="w-full ">
              <label htmlFor="description" className="text-sm font-semibold">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                className="w-full bg-bodyColor border p-3 border-textGreen h-[40px] my-4 rounded-xl mt-4 text-sm font-semibold
             transition-all duration-300 outline-none"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter Description"
                className="w-full bg-bodyColor border p-3 border-textGreen h-[40px] my-4 rounded-xl mt-4 text-sm font-semibold
             transition-all duration-300 outline-none"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
              <label htmlFor="Status" className="text-sm font-semibold">
                Status
              </label>
              <select
                className="w-full bg-bodyColor border p-3 border-textGreen h-[40px] my-4 rounded-xl mt-4 text-sm font-semibold
                transition-all duration-300 outline-none"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <option value={true}>Completed</option>
                <option value={false}>Pending</option>
              </select>

              <button
                type="submit"
                className="w-full h-[40px] text-white rounded-full mt-4 text-sm font-semibold
              hover:bg-textGreen hover:text-bodyColor border border-textGreen border-b-4 transition-all duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => setShow(false)}
                className="py-3 text-center"
              >
                <span className="text-textGreen  text-center inline-flex relative cursor-pointer h-7 overflow-x-hidden group">
                  Cancel{" "}
                  <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1 -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-300"></span>
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UpdateTaskModal;
