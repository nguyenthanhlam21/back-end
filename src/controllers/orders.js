import { StatusCodes } from "http-status-codes";
import Order from "../models/OrderModel.js";
import ApiError from "../utils/ApiError.js";
import Cart from "../models/CartModel.js";

class OrdersController {
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find();
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }
  async getOrderDetail(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }
  async createOrder(req, res, next) {
    try {
      const newOrder = await Order.create(req.body);
      const cart = await Cart.findOneAndDelete({ user: req.body.user });
      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.CREATED).json({
        message: "Create Order Successfull",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateOrder(req, res, next) {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateOrder) throw new ApiError(404, "Order Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Order Successfull",
        data: updateOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
