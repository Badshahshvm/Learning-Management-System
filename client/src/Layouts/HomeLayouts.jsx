import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer"; // Corrected the import
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  console.log(isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSize = document.getElementsByClassName("drawer-side");
    drawerSize[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerSize = document.getElementsByClassName("drawer-side");
    drawerSize[0].style.width = "0"; // Added quotes around '0'
  };

  const handleLogout = async (e) => {
    e.preventDefault(); // Corrected the typo in preventDefault

    const res = await dispatch(logout());

    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-[98vh]">
      <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/course/create">Create new Course</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="bg-yellow-300 px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="bg-blue-500 px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="bg-yellow-300 px-4 py-1 font-semibold rounded-md w-full">
                    <Link to={"/user/profile"}>Profile</Link>
                  </button>
                  <button className="bg-blue-500 px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
