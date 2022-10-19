import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as techRepo from "../../repositories/admin/technology";

export const addTechnology = async (req, res) => {
  logger.log(level.debug, `>> addTechnology()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const techData = await techRepo.addTechnology(req.body, req.files);
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< addTechnology error=${error}`);
    serverError(res);
  }
};

export const getAllTechnologies = async (req, res) => {
  logger.log(level.debug, `>> getAllTechnologies()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const techData = await techRepo.getAllTechnologies(options);
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< getAllTechnologies error=${error}`);
    serverError(res);
  }
};

export const updateTechnology = async (req, res) => {
  logger.log(level.debug, `>> updateTechnology()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const techData = await techRepo.updateTechnology(
      req.body,
      req.files,
      req.query
    );
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< updateTechnology error=${error}`);
    serverError(res);
  }
};

export const deleteTechnology = async (req, res) => {
  logger.log(level.debug, `>> deleteTechnology()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const techData = await techRepo.deleteTechnology(req.query);
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< deleteTechnology error=${error}`);
    serverError(res);
  }
};
