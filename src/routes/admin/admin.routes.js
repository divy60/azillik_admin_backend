/**
 * * Admin Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/admin.validator";
import * as adminCtrl from "../../controllers/admin/admin.controller";
import { adminAuthMiddleware } from "../../middleware/authentication";
import productRoutes from "./product.routes";
import pillarRoutes from "./pillar.routes";
import homePageRoutes from "./homePage.routes";
import faqRoutes from "./faq.routes";
import configRoutes from "./config.routes";
import portfolioRoutes from "./portfolio.routes";
import technologyRoutes from "./technlogy.routes";
import blogRoutes from "./blog.routes";

const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot_password/email/:email",
  PASSWORD_RESET: "/password_reset/email/:email/token/:token",
  CHANGE_PASSWORD_OTP: "/change_password_otp",
  CHANGE_PASSWORD: "/change_password",
  MY_ACCOUNT: "/me",
  PRODUCT: "/product",
  PILLAR: "/pillar",
  HOME_PAGE: "/home_page",
  FAQ: "/faq",
  CONFIG: "/config",
  PORTFOLIO: "/portfolio",
  TECHNOLOGY: "/technology",
  BLOG: "/blog",
};

/**
 * @desc Blog Routes
 * **/
routes.use(PATH.BLOG, blogRoutes);

/**
 * @desc Technology Routes
 * **/
routes.use(PATH.TECHNOLOGY, technologyRoutes);

/**
 * @desc Portfolio Routes
 * **/
routes.use(PATH.PORTFOLIO, portfolioRoutes);

/**
 * @desc Config Routes
 * **/
routes.use(PATH.CONFIG, configRoutes);

/**
 * @desc FAQ Routes
 * **/
routes.use(PATH.FAQ, faqRoutes);

/**
 * @desc Home Page Routes
 * **/
routes.use(PATH.HOME_PAGE, homePageRoutes);

/**
 * @desc Pillor Routes
 * **/
routes.use(PATH.PILLAR, pillarRoutes);

/**
 * @desc Product Routes
 * **/
routes.use(PATH.PRODUCT, productRoutes);

/**
 * @api {POST} /api/admin/signup?platform=app
 * @desc New Admin Register API
 * @access Using Secret
 * **/
routes.post(
  PATH.SIGNUP,
  validate(VALIDATOR.ADMIN_SIGNUP),
  adminCtrl.adminSignup
);

/**
 * @api {POST} /api/admin/login
 * @desc Admin Login API
 * @access Public
 * **/
routes.post(PATH.LOGIN, validate(VALIDATOR.ADMIN_LOGIN), adminCtrl.adminLogin);

/**
 * @api {GET} /api/admin/forgot_password/email/:email
 * @desc Admin Forget Password API
 * @access Public
 * **/
routes.get(
  PATH.FORGOT_PASSWORD,
  validate(VALIDATOR.ADMIN_FORGOT_PASSWORD),
  adminCtrl.adminForgotPassword
);

/**
 * @api {POST} /api/admin/change_password_otp
 * @desc Admin RESET Password API from app
 * @access Public
 * **/
routes.post(
  PATH.CHANGE_PASSWORD_OTP,
  validate(VALIDATOR.CHANGE_PASSWORD_OTP),
  adminCtrl.changePasswordOtp
);

/**
 * @desc Admin Auth Middleware: Use for authenticate adminuser routes
 * **/
routes.use(adminAuthMiddleware);

/**
 * @api {get} /api/admin/me
 * @desc  My Admin account
 * @access Private
 * **/

routes
  .route(PATH.MY_ACCOUNT)
  .get(adminCtrl.myAdminAccount)

  /**
   * @api {PUT} /api/admin/me
   * @desc Update My Account
   * @access Private
   * **/
  .put(validate(VALIDATOR.UPDATE_ACCOUNT), adminCtrl.updateAdminAccount);

export default routes;
