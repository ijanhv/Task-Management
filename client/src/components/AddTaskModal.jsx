import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import newRequest from "../utils/newREquest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddTaskModal = ({ show, setShow }) => {
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        console.log(values);
        const { title, description, status = false } = values;
        console.log(title, description, status);
        mutation.mutate({ title, description, status });
        setShow(false);
        action.resetForm();
      },
    });

  const modalRef = useRef(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["addTask"],
    mutationFn: (task) => {
      return newRequest.post("/tasks", task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

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
            className="w-[300px] md:w-[600px] border border-textGreen h-[500px] rounded-lg bg-bodyColor p-4 md:p-8 overflow-y-auto  flex flex-col items-center relative"
          >
            <h2 className="w-full text-center text-2xl font-bold pb-3">
              Add Task
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <label htmlFor="title" className="text-sm font-semibold">
                Title
              </label>
              <input
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                name="title"
                placeholder="Enter Title"
                className="w-full bg-bodyColor border p-3 border-textGreen h-[40px] my-3 rounded-xl mt-4 text-sm font-semibold
               transition-all duration-300 outline-none"
              />
              {errors.title && touched.title && (
                <p className="text-sm text-red-500 text-left">{errors.title}</p>
              )}

              <label
                htmlFor="description"
                className="text-sm font-semibold py-4"
              >
                Description
              </label>
              <input
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                placeholder="Enter Description"
                className="w-full bg-bodyColor border p-3 border-textGreen h-[40px] my-3 rounded-xl mt-4 text-sm font-semibold
               transition-all duration-300 outline-none"
              />
              {errors.description && touched.description && (
                <p className="text-sm text-red-500 text-left">
                  {errors.description}
                </p>
              )}

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

export default AddTaskModal;
