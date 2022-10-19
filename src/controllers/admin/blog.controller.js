import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as blogRepo from "../../repositories/admin/blog";

export const addBlog = async (req, res) => {
  logger.log(level.debug, `>> addBlog()`);
  const errors = validationResult(req);
  const { admin_id } = req.currentAdminUser;

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const blogData = await blogRepo.addBlog(req.body, req.files, admin_id);
    successResponse(res, blogData);
  } catch (error) {
    logger.log(level.error, `<< addBlog error=${error}`);
    serverError(res);
  }
};

export const getAllBlogs = async (req, res) => {
  logger.log(level.debug, `>> getAllBlogs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const blogData = await blogRepo.getAllBlogs(options);
    successResponse(res, blogData);
  } catch (error) {
    logger.log(level.error, `<< getAllBlogs error=${error}`);
    serverError(res);
  }
};

export const updateBlog = async (req, res) => {
  logger.log(level.debug, `>> updateBlog()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const blogData = await blogRepo.updateBlog(req.body, req.files, req.query);
    successResponse(res, blogData);
  } catch (error) {
    logger.log(level.error, `<< updateBlog error=${error}`);
    serverError(res);
  }
};

export const deleteBlog = async (req, res) => {
  logger.log(level.debug, `>> deleteBlog()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const blogData = await blogRepo.deleteBlog(req.query);
    successResponse(res, blogData);
  } catch (error) {
    logger.log(level.error, `<< deleteBlog error=${error}`);
    serverError(res);
  }
};
