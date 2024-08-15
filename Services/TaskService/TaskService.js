import TaskModel from "../../Models/TaskModel/TaskModel.js";

const TaskService = {
  createTask: async (req) => {
    const { name, description, team, priority, status, endDate } = req.body;
    const file = req.imageUrl; // Assuming Cloudinary middleware attaches the image URL to req

    const task = new TaskModel({
      name,
      description,
      team,
      priority,
      file,
      status,
      endDate,
    });

    await task.save();
    return task;
  },

  getAllTasks: async () => {
    const tasks = await TaskModel.find().populate("team");
    return tasks;
  },

  getTaskById: async (id) => {
    const task = await TaskModel.findById(id)
    .populate({
      path: "team",
      populate: [
        {
          path: "members", // Populate the members field in the team model
          model: "User", // Specify the model to use for the members population
        },
        {
          path: "lead", // Populate the lead field in the team model
          model: "User", // Specify the model to use for the lead population
        },
      ],
    });
    return task;
  },

  updateTaskFile: async (id, req) => {
    const file = req.imageUrl; // Assuming Cloudinary middleware attaches the image URL to req

    const task = await TaskModel.findByIdAndUpdate(id, { file }, { new: true });

    return task;
  },

  updateTask: async (id, taskData) => {
    // console.log(taskData);
    const task = await TaskModel.findById(
      id).populate({
      path: "team",
      populate: [
        {
          path: "members", // Populate the members field in the team model
          model: "User", // Specify the model to use for the members population
        },
        {
          path: "lead", // Populate the lead field in the team model
          model: "User", // Specify the model to use for the lead population
        },
      ],
    });

    task.name = taskData.name || task.name;
    task.description = taskData.description || task.description;
    task.team = taskData.team || task.team; // Ensure team update logic is correct
    task.priority = taskData.priority || task.priority;
    task.status = taskData.status || task.status;
    task.endDate = taskData.endDate || task.endDate;
   await task.save();
   const updatedTask = await TaskModel.findById(id).populate({
     path: "team",
     populate: [
       {
         path: "members", // Populate the members field in the team model
         model: "User", // Specify the model to use for the members population
       },
       {
         path: "lead", // Populate the lead field in the team model
         model: "User", // Specify the model to use for the lead population
       },
     ],
   });

   return updatedTask;
  },

  deleteTask: async (id) => {
    const task = await TaskModel.findByIdAndDelete(id);
    return task;
  },
};

export default TaskService;
