/**
 * * Blog Routes
 */

import { Router } from "express";
const routes = new Router();
import { constants as VALIDATOR } from "../../constant/validator/admin";
import { validate } from "../../validator/admin/blog.validator";
import * as blogCtrl from "../../controllers/admin/blog.controller";
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
   * @api {POST} /api/admin/blog
   * @desc  Add Blog
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_BLOG), blogCtrl.addBlog)
  /**
   * @api {GET} /api/admin/blog
   * @desc  Get All Blogs
   * @access Private
   * **/
  .get(blogCtrl.getAllBlogs)
  /**
   * @api {PUT} /api/admin/blog
   * @desc  Update Blog
   * @access Private
   * **/
  .put(validate(VALIDATOR.EDIT_BLOG), blogCtrl.updateBlog)
  /**
   * @api {DELETE} /api/admin/blog
   * @desc  Delete Blog
   * @access Private
   * **/
  .delete(validate(VALIDATOR.DELETE_BLOG), blogCtrl.deleteBlog);

export default routes;
