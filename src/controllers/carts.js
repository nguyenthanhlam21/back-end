import { StatusCodes } from "http-status-codes";
import Cart from "../models/CartModel.js";
import ApiError from "../utils/ApiError.js";
import Product from "../models/ProductModel.js";

class CartsController {
  
  async getAllCarts(req, res, next) {
    try {
      const carts = await Cart.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      res.status(StatusCodes.OK).json(carts);
    } catch (error) {
      next(error);
    }
  }
  
  async getCartDetail(req, res, next) {
    try {
      const cart = await Cart.findById(req.params.id);

      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }
  
  async getCartUser(req, res, next) {
    try {
      const cart = await Cart.findOne({ user: req.params.id }).populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }
  
  async createCart(req, res, next) {
    try {
      const { quantity, user, product } = req.body;
      const cart = await Cart.findOne({ user });
      if (cart)
        throw new ApiError(404, "Cart Existed, You can only Update Cart");
      const newCart = await Cart.create({
        user,
        products: [
          {
            product,
            quantity,
          },
        ],
      });
      res.status(StatusCodes.CREATED).json({
        message: "Add Cart Successfull",
        data: newCart,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProductCart(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity, user, product } = req.body;
      const cart = await Cart.findOne({ user });
      if (!cart) throw new ApiError(404, "Cart Not Found");

      const productExisted = cart.products.find(
        (item) => item.product == product
      );
      let newProductCart = [];
      if (productExisted) {
        newProductCart = cart.products.map((item) =>
          item.product == product
            ? { product, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newProductCart = [...cart.products, { product, quantity }];
      }
      const updateCart = await Cart.findByIdAndUpdate(
        cart._id,
        { products: newProductCart },
        {
          new: true,
        }
      );
      res.status(StatusCodes.CREATED).json({
        message: "Update Cart Successfull",
        data: updateCart,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProductCart(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req.body;
      const cart = await Cart.findOne({ user });
      if (!cart) throw new ApiError(404, "Cart Not Found");

      const newProductCart = cart.products.filter((item) => item.product != id);

      const updateCart = await Cart.findByIdAndUpdate(
        cart._id,
        { products: newProductCart },
        {
          new: true,
        }
      );
      if (!updateCart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.CREATED).json({
        message: "Delete Product Cart Successfull",
        data: updateCart,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCart(req, res, next) {
    try {
      const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updateCart) throw new ApiError(404, "Cart Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Cart Successfull",
        data: updateCart,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCart(req, res, next) {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Cart Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CartsController;
