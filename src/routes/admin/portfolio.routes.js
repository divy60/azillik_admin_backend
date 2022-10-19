/**
 * * Portfolio Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/portfolio.validator";
import * as portfolioCtrl from "../../controllers/admin/portfolio.controller";
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
   * @api {POST} /api/admin/portfolio
   * @desc  Add Portfolio
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_PORTFOLIO), portfolioCtrl.addPortfolio)
  /**
   * @api {GET} /api/admin/portfolio
   * @desc  Get All Portfolios
   * @access Private
   * **/
  .get(portfolioCtrl.getAllPortfolios)
  /**
   * @api {PUT} /api/admin/portfolio
   * @desc  Update Portfolio
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_PORTFOLIO), portfolioCtrl.updatePortfolio)
  /**
   * @api {DELETE} /api/admin/portfolio
   * @desc  Delete Portfolio
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_PORTFOLIO), portfolioCtrl.deletePortfolio);

export default routes;
