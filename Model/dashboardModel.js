import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
  todaySales: Number,
  totalOrders: Number,
  customers: Number,
  pendingOrders: Number,
  completedOrders: Number,
  activeStatus: Boolean,
  locations: Number,
});

export default mongoose.model('Dashboard', dashboardSchema);
