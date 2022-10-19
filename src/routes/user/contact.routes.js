/**
 * * Admin Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/user";
import { validate } from "../../validator/user/contact.validator";
import * as contactCtrl from "../../controllers/user/contact.controller";
import * as productCtrl from "../../controllers/user/product.controller";

const PATH = {
  ROOT: "/contact",
  APPLY_JOB: "/apply_job",
  APPLY_INTERNSHIP: "/apply_internship",
  WE_WORK: "/we_work",
  PRODUCT: "/product",
  PILLAR: "/pillar",
  HOME_PAGE: "/home_page",
  FAQ: "/faq",
  PRODUCT_GROWTH: "/product_growth",
  CONFIG: "/config",
  PORTFOLIO: "/portfolio",
  TECHNOLOGY: "/technology",
  BLOG: "/blog",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/user/contact
   * @desc  Add Contact
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_CONTACT), contactCtrl.addContactUs);

routes
  .route(PATH.APPLY_JOB)
  /**
   * @api {POST} /api/user/apply_job
   * @desc  Apply JOB
   * @access Private
   * **/
  .post(validate(VALIDATOR.APPLY_JOB), contactCtrl.applyJob);

routes
  .route(PATH.APPLY_INTERNSHIP)
  /**
   * @api {POST} /api/user/apply_internship
   * @desc  Apply Internship
   * @access Private
   * **/
  .post(validate(VALIDATOR.APPLY_INTERSHIP), contactCtrl.applyInternship);

routes
  .route(PATH.WE_WORK)
  /**
   * @api {POST} /api/user/we_work
   * @desc  We work on
   * @access Private
   * **/
  .post(validate(VALIDATOR.WE_WORK), contactCtrl.weWorkOn);

routes
  .route(PATH.PRODUCT)
  /**
   * @api {GET} /api/user/product
   * @desc  Get All Products
   * @access Private
   * **/
  .get(productCtrl.getAllProducts);

routes
  .route(PATH.PILLAR)
  /**
   * @api {GET} /api/user/pillar
   * @desc  Get All Pillars
   * @access Private
   * **/
  .get(productCtrl.getAllPillars);

routes
  .route(PATH.HOME_PAGE)
  /**
   * @api {GET} /api/user/home_page
   * @desc  Get All Home Pages
   * @access Private
   * **/
  .get(productCtrl.getAllHomePages);

routes
  .route(PATH.FAQ)
  /**
   * @api {GET} /api/user/faq
   * @desc  Get All FAQs
   * @access Private
   * **/
  .get(productCtrl.getAllFAQs);

routes
  .route(PATH.PRODUCT_GROWTH)
  /**
   * @api {GET} /api/user/product_growth
   * @desc  Get All Product Growths
   * @access Private
   * **/
  .get(productCtrl.getAllProductGrowths);

routes
  .route(PATH.CONFIG)
  /**
   * @api {GET} /api/user/config
   * @desc  Get All configs
   * @access Private
   * **/
  .get(productCtrl.getConfigs);

routes
  .route(PATH.PORTFOLIO)
  /**
   * @api {GET} /api/user/portfolio
   * @desc  Get All portfolios
   * @access Private
   * **/
  .get(productCtrl.getAllPortfolios);

routes
  .route(PATH.TECHNOLOGY)
  /**
   * @api {GET} /api/user/technology
   * @desc  Get All Technologies
   * @access Private
   * **/
  .get(productCtrl.getAllTechnologies);

routes
  .route(PATH.BLOG)
  /**
   * @api {GET} /api/user/blog
   * @desc  Get All Blogs
   * @access Private
   * **/
  .get(productCtrl.getAllBlogs);

export default routes;
