import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as faqRepo from "../../repositories/admin/faq";

export const addFAQ = async (req, res) => {
  logger.log(level.debug, `>> addFAQ()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.addFAQ(req.body);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< addFAQ error=${error}`);
    serverError(res);
  }
};

export const getAllFAQs = async (req, res) => {
  logger.log(level.debug, `>> getAllFAQs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await faqRepo.getAllFAQs(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getAllFAQs error=${error}`);
    serverError(res);
  }
};

export const updateFAQ = async (req, res) => {
  logger.log(level.debug, `>> updateFAQ()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.updateFAQ(req.body, req.query);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< updateFAQ error=${error}`);
    serverError(res);
  }
};

export const deleteFAQ = async (req, res) => {
  logger.log(level.debug, `>> deleteFAQ()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.deleteFAQ(req.query);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< deleteFAQ error=${error}`);
    serverError(res);
  }
};

export const addProductGrowth = async (req, res) => {
  logger.log(level.debug, `>> addProductGrowth()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.addProductGrowth(req.body);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< addProductGrowth error=${error}`);
    serverError(res);
  }
};

export const getAllProductGrowths = async (req, res) => {
  logger.log(level.debug, `>> getAllProductGrowths()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await faqRepo.getAllProductGrowths(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getAllProductGrowths error=${error}`);
    serverError(res);
  }
};

export const updateProductGrowth = async (req, res) => {
  logger.log(level.debug, `>> updateProductGrowth()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.updateProductGrowth(req.body, req.query);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< updateProductGrowth error=${error}`);
    serverError(res);
  }
};

export const deleteProductGrowth = async (req, res) => {
  logger.log(level.debug, `>> deleteProductGrowth()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const faqData = await faqRepo.deleteProductGrowth(req.query);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< deleteProductGrowth error=${error}`);
    serverError(res);
  }
};
