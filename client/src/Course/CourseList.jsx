import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayouts";
import { getAllCourses } from "../Redux/Slices/CourseSlice";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const { coursesData } = useSelector((state) => state.course);

  const loadCourse = async () => {
    await disPatch(getAllCourses());
  };
  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <HomeLayout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col items-center justify-center flex-wrap gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>
        {/* wrapper for courses card */}
        <div className="mb-10 flex flex-wrap gap-14">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
