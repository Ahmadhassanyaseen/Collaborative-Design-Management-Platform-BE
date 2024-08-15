import TaskService from "../../Services/TaskService/TaskService.js";

const TaskController = {
  createTask: async (req, res) => {
    try {
      const task = await TaskService.createTask(req);
      res.status(201).send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to create task" });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskService.getAllTasks();
      res.status(200).send(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch tasks" });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).send({ error: "Task not found" });
      }
      res.status(200).send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch task" });
    }
  },

  updateTaskFile: async (req, res) => {
    try {
      const task = await TaskService.updateTaskFile(req.params.id, req);
      if (!task) {
        return res.status(404).send({ error: "Task not found" });
      }
      res.status(200).send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to update task file" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).send({ error: "Task not found" });
      }
      res.status(200).send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to update team" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = await TaskService.deleteTask(req.params.id);
      if (!task) {
        return res.status(404).send({ error: "Task not found" });
      }
      res.status(200).send({ message: "Task deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to delete task" });
    }
  },
};

export default TaskController;
