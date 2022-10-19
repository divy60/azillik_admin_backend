/**
 * * Technology Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/homePage.validator";
import * as technologyCtrl from "../../controllers/admin/technology.controller";
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
   * @api {POST} /api/admin/technology
   * @desc  Add Technology
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_TECH), technologyCtrl.addTechnology)
  /**
   * @api {GET} /api/admin/technology
   * @desc  Get All Technologies
   * @access Private
   * **/
  .get(technologyCtrl.getAllTechnologies)
  /**
   * @api {PUT} /api/admin/technology
   * @desc  Update Technology
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_TECH), technologyCtrl.updateTechnology)
  /**
   * @api {DELETE} /api/admin/technology
   * @desc  Delete Technology
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_TECH), technologyCtrl.deleteTechnology);

export default routes;
