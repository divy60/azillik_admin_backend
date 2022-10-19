/**
 * * Home Page Routes
 */

import { Router } from "express";
const routes = new Router();
import * as configCtrl from "../../controllers/admin/config.controller";
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
   * @api {POST} /api/admin/config
   * @desc  Add/Update Config
   * @access Private
   * **/
  .put(configCtrl.addConfig)
  /**
   * @api {GET} /api/admin/config
   * @desc  Get Configs
   * @access Private
   * **/
  .get(configCtrl.getConfigs);

export default routes;
