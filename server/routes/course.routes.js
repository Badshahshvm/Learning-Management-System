const express = require("express");
const {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourseById,
} = require("../controllers/course");
const isLoggedIn = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/multer.middlewares");
const authorizedRoles = require("../middlewares/checkAuthorized.middlewares");

const router = express.Router();

router.get("/", getAllCourses);
router.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);
router.put("/:id", authorizedRoles("ADMIN"), isLoggedIn, updateCourse);
router.delete("/:id", authorizedRoles("ADMIN"), isLoggedIn, deleteCourse);
router.get("/:id", isLoggedIn, getLecturesByCourseId);
router.post(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("lecture"),
  addLectureToCourseById
);

module.exports = router;
