/**
 * * Home Page Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/homePage.validator";
import * as homePageCtrl from "../../controllers/admin/homePage.controller";
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
   * @api {POST} /api/admin/home_page
   * @desc  Add Home Page
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_HOME_PAGE), homePageCtrl.addHomePageSlider)
  /**
   * @api {GET} /api/admin/home_page
   * @desc  Get All Home Pages
   * @access Private
   * **/
  .get(homePageCtrl.getAllHomePages)
  /**
   * @api {PUT} /api/admin/home_page
   * @desc  Update Home Page
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_HOME_PAGE), homePageCtrl.updateHomePageData)
  /**
   * @api {DELETE} /api/admin/pillar
   * @desc  Delete Pillar
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_HOME_PAGE), homePageCtrl.deleteHomePageData);

export default routes;
