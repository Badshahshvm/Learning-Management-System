// rootReducer.js
import { combineReducers } from "redux";

import authReducer from "../Slices/AuthSlice";
import courseReducer from "../Slices/CourseSlice";
import rozarPayReducer from "../Slices/CourseSlice";
import lectureReducer from "../Slices/LectureSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  razorpay: rozarPayReducer,
  lecture: lectureReducer,

  // ...other reducers
});

export default rootReducer;
