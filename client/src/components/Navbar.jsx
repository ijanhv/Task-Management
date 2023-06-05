import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="w-full shadow-navbarShadow h-20 lg:h-[10vh] sticky top-0 z-50 bg-bodyColor px-4">
      <div className="max-w-contentContainer h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div>
          <h1 className="flex items-center text-2xl font-semibold text-primaryColor">
            <span className="hexagon-border">Task Management App</span>
          </h1>
        </div>
        <div className="hidden mdl:inline-flex items-center gap-7">
          <a href="" target="_blank">
            <button className="px-4 py-2 items-center rounded-full text-textGreen text-[13px] border border-textGreen hover:bg-hoverColor transform hover:scale-110 transition-all duration-300">
              <span className="flex items-center gap-1 ">
                Resume <BsArrowUpRight />{" "}
              </span>
            </button>
          </a>
        </div>
        {/* Small Icon section */}
        <div className="w-6 h-5 flex flex-col justify-between items-center mdl:hidden text-4xl text-textGreen cursor-pointer overflow-hidden group">
          <span className="w-full h-[2px] bg-textGreen inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-textGreen inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-textGreen inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
