/**
 * * Admin Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/product.validator";
import * as productCtrl from "../../controllers/admin/product.controller";
import { adminAuthMiddleware } from "../../middleware/authentication";

const PATH = {
  ROOT: "/",
};

/**
 * @desc Admin Auth Middleware: Use for authenticate adminuser routes
 * **/
routes.use(adminAuthMiddleware);

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/admin/product
   * @desc  Add Product
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_PRODUCT), productCtrl.addProduct)
  /**
   * @api {GET} /api/admin/product
   * @desc  Get All Products
   * @access Private
   * **/
  .get(productCtrl.getAllProducts)
  /**
   * @api {PUT} /api/admin/product
   * @desc  Update Product
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_PRODUCT), productCtrl.updateProduct)
  /**
   * @api {DELETE} /api/admin/product
   * @desc  Delete Product
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_PRODUCT), productCtrl.deleteProduct);

export default routes;
