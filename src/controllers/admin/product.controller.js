import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as productRepo from "../../repositories/admin/product";

export const addProduct = async (req, res) => {
  logger.log(level.debug, `>> addProduct()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const productData = await productRepo.addProduct(req.body, req.files);
    successResponse(res, productData);
  } catch (error) {
    logger.log(level.error, `<< addProduct error=${error}`);
    serverError(res);
  }
};

export const getAllProducts = async (req, res) => {
  logger.log(level.debug, `>> getAllProducts()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const productData = await productRepo.getAllProducts(options);
    successResponse(res, productData);
  } catch (error) {
    logger.log(level.error, `<< getAllProducts error=${error}`);
    serverError(res);
  }
};

export const updateProduct = async (req, res) => {
  logger.log(level.debug, `>> updateProduct()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const productData = await productRepo.updateProduct(
      req.body,
      req.files,
      req.query
    );
    successResponse(res, productData);
  } catch (error) {
    logger.log(level.error, `<< updateProduct error=${error}`);
    serverError(res);
  }
};

export const deleteProduct = async (req, res) => {
  logger.log(level.debug, `>> deleteProduct()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const productData = await productRepo.deleteProduct(req.query);
    successResponse(res, productData);
  } catch (error) {
    logger.log(level.error, `<< deleteProduct error=${error}`);
    serverError(res);
  }
};
