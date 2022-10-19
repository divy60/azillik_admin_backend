/**
 * * Home Page Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/homePage.validator";
import * as faqCtrl from "../../controllers/admin/faq.controller";
import { adminAuthMiddleware } from "../../middleware/authentication";

const PATH = {
  ROOT: "/",
  PRODUCT_GROWTH: "/product_growth",
};

/**
 * @desc Admin Auth Middleware: Use for authenticate adminuser routes
 * **/
routes.use(adminAuthMiddleware);

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/admin/faq
   * @desc  Add FAQ
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_FAQ), faqCtrl.addFAQ)
  /**
   * @api {GET} /api/admin/faq
   * @desc  Get All FAQs
   * @access Private
   * **/
  .get(faqCtrl.getAllFAQs)
  /**
   * @api {PUT} /api/admin/faq
   * @desc  Update FAQ
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_FAQ), faqCtrl.updateFAQ)
  /**
   * @api {DELETE} /api/admin/faq
   * @desc  Delete FAQ
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_FAQ), faqCtrl.deleteFAQ);

routes
  .route(PATH.PRODUCT_GROWTH)
  /**
   * @api {POST} /api/admin/product_growth
   * @desc  Add Product Growth
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_FAQ), faqCtrl.addProductGrowth)
  /**
   * @api {GET} /api/admin/product_growth
   * @desc  Get All Product Growths
   * @access Private
   * **/
  .get(faqCtrl.getAllProductGrowths)
  /**
   * @api {PUT} /api/admin/product_growth
   * @desc  Update Product Growth
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_PRODUCT_GROWTH), faqCtrl.updateProductGrowth)
  /**
   * @api {DELETE} /api/admin/product_growth
   * @desc  Delete Product Growth
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_PRODUCT_GROWTH), faqCtrl.deleteProductGrowth);

export default routes;
