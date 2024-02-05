import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";

import homePageImage from "../Assets/Images/third.webp";
import HomeLayout from "../Layouts/HomeLayouts";

const HomePge = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Frontend Developer",
        "Backend Developer",
        "Java Developer",
        "Machine learning",
        "Data Analyst",
        "Data Scientiest",
      ], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 100,
      typeSpeed: 50,
      backSpeed: 10,
      backDelay: 100,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div>
      <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx=16 h-[90vh]">
          <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
              Find out best
              <span className="text-yellow-500 font-bold"> Online Courses</span>
              <h2 className="text-3xl ">
                <span className="font-bold " ref={el}></span>
              </h2>
            </h1>

            <p className="txt-xl text-gray-500">
              WE have large library of courses taught by highly skilled and
              qualified faculties at very affordable cost
            </p>
            <div className="space-x-6">
              <Link to="/courses">
                <button className="bg-yellow-500 px-5 py-3 rounded-md cursor-pointer hover:bg-yellow fint-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out d-30000">
                  {" "}
                  Explore courses
                </button>
              </Link>

              <Link to="/contact">
                <button className=" border border-yellow px-5 py-3 rounded-md cursor-pointer hover:bg-yellow fint-semibold text-lg hover:bg-yellow-800 transition-all ease-in-out d-30000">
                  {" "}
                  Contact us
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <img alt="homepage image" src={homePageImage} />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default HomePge;
