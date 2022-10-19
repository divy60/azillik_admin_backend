import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as homePageRepo from "../../repositories/admin/homePage";

export const addHomePageSlider = async (req, res) => {
  logger.log(level.debug, `>> addHomePageSlider()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const homePageData = await homePageRepo.addHomePageSlider(
      req.body,
      req.files
    );
    successResponse(res, homePageData);
  } catch (error) {
    logger.log(level.error, `<< addHomePageSlider error=${error}`);
    serverError(res);
  }
};

export const getAllHomePages = async (req, res) => {
  logger.log(level.debug, `>> getAllHomePages()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const homePageData = await homePageRepo.getAllHomePages(options);
    successResponse(res, homePageData);
  } catch (error) {
    logger.log(level.error, `<< getAllHomePages error=${error}`);
    serverError(res);
  }
};

export const updateHomePageData = async (req, res) => {
  logger.log(level.debug, `>> updateHomePageData()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const homePageData = await homePageRepo.updateHomePageData(
      req.body,
      req.files,
      req.query
    );
    successResponse(res, homePageData);
  } catch (error) {
    logger.log(level.error, `<< updateHomePageData error=${error}`);
    serverError(res);
  }
};

export const deleteHomePageData = async (req, res) => {
  logger.log(level.debug, `>> deleteHomePageData()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const homePageData = await homePageRepo.deleteHomePageData(req.query);
    successResponse(res, homePageData);
  } catch (error) {
    logger.log(level.error, `<< deleteHomePageData error=${error}`);
    serverError(res);
  }
};
