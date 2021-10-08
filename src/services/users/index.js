import express from "express";
import createHttpError from "http-errors";
import UserModel from "../../../schemas/User.js";
import AccommodationModel from "../../../schemas/Accommodation.js";
import { hostMiddleware } from "../../auth/hostMiddleware.js";
import { tokenMiddleware } from "../../auth/tokenMiddleware.js";
import { generateJWTToken } from "../../auth/tokenTools.js";

const usersRouter = express.Router();

// =================== Get all users ====================

usersRouter.get("/", tokenMiddleware, async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// =================== Register user ====================
usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    next(error);
  }
});

// =================== Login me ====================
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.checkCredentials(email, password);
    if (user) {
      const accessToken = await generateJWTToken(user);
      res.send({ accessToken });
    } else {
      next(createHttpError(401, "credentials not correct."));
    }
  } catch (error) {
    next(error);
  }
});

// =================== Get me ====================
usersRouter.get("/me", tokenMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// ================ My accommodations ================
usersRouter.get(
  "/me/accommodations",
  tokenMiddleware,
  hostMiddleware,
  async (req, res, next) => {
    try {
      const hostId = req.user._id;
      const myAccommodations = await AccommodationModel.find({
        host: hostId,
      }).populate("host");
      res.send(myAccommodations);
    } catch (error) {
      next(error);
    }
  }
);

// =================== Update me ====================
usersRouter.put("/me", tokenMiddleware, async (req, res, next) => {
  try {
    const updatedMe = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    res.send(updatedMe);
  } catch (error) {
    next(error);
  }
});

// =================== Delete me ====================
usersRouter.delete("/me", tokenMiddleware, async (req, res, next) => {
  try {
    const deletedMe = await UserModel.findByIdAndDelete(req.user._id);
    res.send("You've deleted your account!");
  } catch (error) {
    next(error);
  }
});

//    // ================== Google Login =================
//    usersRouter.get(
//     "/googleLogin",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

//   // ================= Google redirect ===============
//   usersRouter.get(
//     "/googleRedirect",
//     passport.authenticate("google"),
//     async (req, res, next) => {
//       try {
//         console.log("REQ.USER", req.user);
//         res.redirect(`${process.env.FE_PROD_URL}?accessToken=${req.user.token}`);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

export default usersRouter;
