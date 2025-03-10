import { StatusCodes } from "http-status-codes";
import Category from "../models/CategoryModel.js";
import ApiError from "../utils/ApiError.js";

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }
  async getCategoryDetail(req, res, next) {
    try {
      const category = await Category.findById(req.params._id);

      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }
  async createCategory(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Category Successfull",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params._id,
        req.body
      );
      if (!category) throw new ApiError(404, "Category Not Found");
      const updateCategory = await Category.findById(req.params._id);
      res.status(StatusCodes.OK).json({
        message: "Update Category Successfull",
        data: updateCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params._id);
      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Category Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
