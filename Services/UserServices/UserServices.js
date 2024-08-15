import UserModel from "../../Models/UserModel/UserModel.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserServices = {
  createUser: async (req, res) => {
    try {
      const imageUrl = req.imageUrl;
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return {
          message: "User Already Exists",
          status: 402,
        };
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = new UserModel(req.body);
      newUser.imageUrl = imageUrl;
      await newUser.save();

      return {
        newUser: newUser,
        status: 200,
      };
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return {
          "message": "User Does Not Exist",
          "status": 404
        };
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return { message: "Incorrect Password", status: 404 };
      }

      const token = jsonwebtoken.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return {
        isLogin:true,
        token: token,
        user: user,
      };
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  allUsers: async (req, res) => {
    try {
      const user = await UserModel.find().populate("role","");
      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  singleUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId).populate("role","");
      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, email, password, phone, role } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return { message: "User not found", status: 404 };
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (phone) user.phone = phone;
      if (role) user.role = role;

      await user.save();

      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  updateUserImage: async (req, res) => {
    try {
      const userId = req.params.userId;
     const imageUrl = req.imageUrl;
     console.log(imageUrl);

      const user = await UserModel.findById(userId);
      if (!user) {
        return { message: "User not found", status: 404 };
      }

      
      if (imageUrl) user.imageUrl = imageUrl;

      await user.save();

      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      // console.log(userId);

      const user = await UserModel.findByIdAndDelete(userId);
      // console.log(user);

      if (!user) {
        return {
          message: "User Does Not Exist",
          status: 404,
        };
      }

      return {
        message: "User Deleted",
        status: 200,
      };
    } catch (e) {
      console.error(e); // Log the full error object for debugging
      return {
        message: "An error occurred",
        status: 500,
      };
    }
  },
};

export default UserServices;