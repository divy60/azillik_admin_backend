import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as pillarRepo from "../../repositories/admin/pillar";

export const addPillar = async (req, res) => {
  logger.log(level.debug, `>> addPillar()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const pillarData = await pillarRepo.addPillar(req.body, req.files);
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< addPillor error=${error}`);
    serverError(res);
  }
};

export const getAllPillars = async (req, res) => {
  logger.log(level.debug, `>> getAllPillars()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const pillarData = await pillarRepo.getAllPillars(options);
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< getAllPillars error=${error}`);
    serverError(res);
  }
};

export const updatePillar = async (req, res) => {
  logger.log(level.debug, `>> updatePillar()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const pillarData = await pillarRepo.updatePillar(
      req.body,
      req.files,
      req.query
    );
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< updatePillar error=${error}`);
    serverError(res);
  }
};

export const deletePillar = async (req, res) => {
  logger.log(level.debug, `>> deletePillar()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const pillarData = await pillarRepo.deletePillar(req.query);
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< deletePillar error=${error}`);
    serverError(res);
  }
};
