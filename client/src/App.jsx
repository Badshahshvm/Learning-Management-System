import "./App.css";

import { Route, Routes } from "react-router-dom";

import RquireAuth from "./Auth/RquireAuth";
import CourseDescription from "./Course/CourseDescription";
import CourseList from "./Course/CourseList";
import CreateCourse from "./Course/CreateCourse";
import AddLectures from "./Dashboard/AddLectures";
import DisplayLecture from "./Dashboard/DisplayLecture";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import HomePge from "./Pages/HomePge";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import UserProfile from "./Pages/User/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePge />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/courses" element={<CourseList />}>
          {" "}
        </Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>
        <Route element={<RquireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
          <Route path="/course/addlecture" element={<AddLectures />}></Route>
        </Route>

        <Route element={<RquireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<UserProfile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route
            path="/course/displaylectures"
            element={<DisplayLecture />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
