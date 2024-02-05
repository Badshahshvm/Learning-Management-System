const courseModel = require("../models/course.nodule");
const cloudinary = require("cloudinary").v2;
const AppError = require("../utils/error.utils");
const fs = require("fs/promises");

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "all courses here",
      courses,
    });
  } catch (error) {
    return next(new AppError(e, 400));
  }
};

const getLecturesByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) {
      return next(new AppError("Invalid courseId", 400));
    }
    res.status(200).json({
      success: true,
      message: "Course lectures fetched succedd",
      course: course.lectures,
    });
  } catch (error) {
    return next(new AppError(e, 400));
  }
};

const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  const course = await courseModel.create({
    title,
    description,
    category,
    createdBy,
  });

  if (!course) {
    return next(
      new AppError("Course could not created, please try again ,500")
    );
  }

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms", // Save files in a folder named lms
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError("File not uploaded, please try again", 400));
    }
  }

  // Save the changes
  await course.save();

  return res.status(200).json({
    success: true,
    message: "successfull uploaded",
    course,
  });
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course with given id does not exist", 500));
    }

    res.status(200).json({
      success: true,
      message: "course updated",
      course: course,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) {
      return next(new AppError("Course with given id does not exist", 500));
    }

    await courseModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

// const addLectureToCourseById = async (req, res, next) => {
//   const { title, description } = req.body;
//   try {
//     const { id } = req.params;
//     let lectureData = {
//       title,
//       description,
//       lecture: {},
//     };

//     if (!title || !description) {
//       return next(new AppError("Title and Description are required", 400));
//     }

//     const course = await courseModel.findById(id);
//     if (!course) {
//       return next(new AppError("Invalid course id or course not found.", 400));
//     }

//     if (req.file) {
//       try {
//         const result = await cloudinary.uploader.upload(req.file.path, {
//           folder: "lms", // Save files in a folder named lms
//         });

//         // If success
//         if (result) {
//           // Set the public_id and secure_url in DB
//           lectureData.lecture.public_id = result.public_id;
//           lectureData.lecture.secure_url = result.secure_url;

//           // After successful upload remove the file from local storage
//           fs.rm(`uploads/${req.file.filename}`);
//         }
//       } catch (error) {
//         return next(new AppError("File not uploaded, please try again", 400));
//       }
//     }

//     course.lectures.push({
//       title,
//       description,
//       lecture: lectureData,
//     });

//     course.numberOfLectures = course.lectures.length;

//     // Save the course object
//     await course.save();

//     res.status(200).json({
//       success: true,
//       message: "Course lecture added successfully",
//       course,
//     });
//   } catch (error) {
//     return next(new AppError(error, 500));
//   }
// };

const addLectureToCourseById = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const { id } = req.params;
    let lectureData = {
      title,
      description,
      lecture: {}, // Initialize as an empty object
    };

    if (!title || !description) {
      return next(new AppError("Title and Description are required", 400));
    }

    const course = await courseModel.findById(id);
    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "lms", // Save files in a folder named lms
          chunk_size: 50000000, // 50 mb size
          resource_type: "video",
        });

        // If success
        if (result) {
          // Set the public_id and secure_url in DB
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;

          // After successful upload remove the file from local storage
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError("File not uploaded, please try again", 400));
      }
    }

    course.lectures.push({
      title,
      description,
      lecture: lectureData.lecture, // Access the lecture property from lectureData
    });

    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course lecture added successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

module.exports = {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourseById,
};
