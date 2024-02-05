const userModel = require("../models/user.model");
const AppError = require("../utils/error.utils");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const sendEmail = require("../utils/SendEmail");

const cookieOptions = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};

const registerUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  // Additional validation for the password
  if (!password) {
    return next(new AppError("Password is required", 400));
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exists", 409));
  }

  const userCreate = await userModel.create({
    fullName,
    email,
    password, // Assuming the password is provided in the request
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  // If user not created, send message response
  if (!userCreate) {
    return next(
      new AppError("User registration failed, please try again later", 400)
    );
  }

  // Run only if user sends a file
  if (req.file) {
    console.log(req.file);
    console.log(req.file.path);
    console.log(process.env.CLOUDINARY_CLOUD_NAME);

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Course", // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: "fill",
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        userCreate.avatar.public_id = result.public_id;
        userCreate.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.rm(req.file.path);
      }
    } catch (error) {
      return next(
        new AppError("File not uploaded, please try again", error, 400)
      );
    }
  }

  //save the object
  await userCreate.save();

  // Generating a JWT token
  try {
    const token = await userCreate.generateJWTToken();

    // Setting the password to undefined so it does not get sent in the response
    userCreate.password = undefined;

    // Setting the token in the cookie with name token along with cookieOptions
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: userCreate,
    });
  } catch (error) {
    return next(new AppError("Token generation failed", 500));
  }
};

const loginUser = async (req, res, next) => {
  // Implement the login logic here
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  try {
    const user = await userModel
      .findOne({ email })
      .select("+password")
      .maxTimeMS(15000);
    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "login sucessfully",
      user,
    });
  } catch (e) {
    return next(new AppError(a, 400));
  }
};

const logoutUser = (req, res) => {
  // Implement the logout logic here

  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logout successfully",
  });
};

const getLoggedInUserDetails = async (req, res) => {
  try {
    const useId = req.user.id;
    const newUser = await userModel.findById(useId);
    res.status(200).json({
      success: true,
      message: "userdetails",
      newUser,
    });
  } catch (e) {
    return next(new AppError(e, 400));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return next(new AppError("Email is required", 400));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new AppError("Email is not registered "));
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // We here need to send an email to the user with the token
    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;
    try {
      await sendEmail(email, subject, message);
      res.status(200).json({
        success: true,
        message: `Reset password has been sent to ${email} successfully`,
      });
    } catch (error) {
      user.forgotPasswordExpiry = undefined;
      user.forgotPasswordToken = undefined;

      await user.save();
      return next(new AppError(error, 500));
    }
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return next(new AppError("User doesn't exist", 400));
    }

    // Update fullName only if it is provided in the request body
    if (fullName) {
      user.fullName = fullName;
    }
    await user.save();
    // Update avatar only if a file is provided in the request
    if (req.file) {
      // Destroy the existing cloudinary avatar
      if (user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload the new avatar to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Course", // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: "fill",
      });

      // If success, update user's avatar information
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload, remove the file from local storage
        fs.rm(req.file.path);
      }
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully...",
      user,
    });
  } catch (error) {
    return next(new AppError("Error updating user", error, 500));
  }
};

const resetPassword = (req, res, next) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserDetails,
  forgotPassword,
  resetPassword,
  updateUser,
};
