import ProductModel from "../../Models/ProductModel/ProductModel.js";
import TaskModel from "../../Models/TaskModel/TaskModel.js";
import UserModel from "../../Models/UserModel/UserModel.js";
import ActivityModel from "../../Models/ActivityModel/ActivityModel.js";

const DashboardController = {
  getStats: async (req, res) => {
    try {
      // Get products count
      const productsCount = await ProductModel.countDocuments();
      
      // Get users count
      const usersCount = await UserModel.countDocuments();
      
      // Get active tasks count
      const tasksCount = await TaskModel.countDocuments({ status: 'active' });
      
      // Get recent products (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentProducts = await ProductModel.find({
        createdAt: { $gte: sevenDaysAgo }
      })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('uploadedBy', 'name email');

      // Get recent activities
      const recentActivities = await ActivityModel.find()
        .sort({ createdAt: -1 })
        .limit(10);

      res.status(200).json({
        products: productsCount,    
        users: usersCount,
        tasks: tasksCount,
        recentProducts,
        recentActivities
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ error: 'Error fetching dashboard stats' });
    }
  }
};

export default DashboardController;