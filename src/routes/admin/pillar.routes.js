/**
 * * Pillor Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/product.validator";
import * as pillarCtrl from "../../controllers/admin/pillar.controller";
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
   * @api {POST} /api/admin/pillar
   * @desc  Add Pillar
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_PILLAR), pillarCtrl.addPillar)
  /**
   * @api {GET} /api/admin/pillar
   * @desc  Get All Pillars
   * @access Private
   * **/
  .get(pillarCtrl.getAllPillars)
  /**
   * @api {PUT} /api/admin/pillar
   * @desc  Update Pillar
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_PILLAR), pillarCtrl.updatePillar)
   /**
    * @api {DELETE} /api/admin/pillar
    * @desc  Delete Pillar
    * @access Private
    * **/
   .delete(validate(VALIDATOR.DELETE_PILLAR), pillarCtrl.deletePillar);

export default routes;
