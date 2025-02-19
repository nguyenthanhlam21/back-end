import { Router } from "express";
import CartsController from "../controllers/carts.js";

const cartsRouter = Router();

const cartsController = new CartsController();

cartsRouter.get("/", cartsController.getAllCarts);
cartsRouter.get("/:id", cartsController.getCartDetail);
cartsRouter.get("/user/:id", cartsController.getCartUser);
cartsRouter.post("/", cartsController.createCart);
cartsRouter.put("/:id", cartsController.updateCart);
cartsRouter.put("/product/:id", cartsController.updateProductCart);
cartsRouter.delete("/:id", cartsController.deleteCart);
cartsRouter.delete("/product/:id", cartsController.deleteProductCart);

export default cartsRouter;
