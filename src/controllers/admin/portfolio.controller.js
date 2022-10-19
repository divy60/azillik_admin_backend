import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as portfolioRepo from "../../repositories/admin/portfolio";

export const addPortfolio = async (req, res) => {
  logger.log(level.debug, `>> addPortfolio()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const portfolioData = await portfolioRepo.addPortfolio(req.body, req.files);
    successResponse(res, portfolioData);
  } catch (error) {
    logger.log(level.error, `<< addPortfolio error=${error}`);
    serverError(res);
  }
};

export const getAllPortfolios = async (req, res) => {
  logger.log(level.debug, `>> getAllPortfolios()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const portfolioData = await portfolioRepo.getAllPortfolios(options);
    successResponse(res, portfolioData);
  } catch (error) {
    logger.log(level.error, `<< getAllPortfolios error=${error}`);
    serverError(res);
  }
};

export const updatePortfolio = async (req, res) => {
  logger.log(level.debug, `>> updatePortfolio()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const portfolioData = await portfolioRepo.updatePortfolio(
      req.body,
      req.files,
      req.query
    );
    successResponse(res, portfolioData);
  } catch (error) {
    logger.log(level.error, `<< updatePortfolio error=${error}`);
    serverError(res);
  }
};

export const deletePortfolio = async (req, res) => {
  logger.log(level.debug, `>> deletePortfolio()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const pillarData = await portfolioRepo.deletePortfolio(req.query);
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< deletePortfolio error=${error}`);
    serverError(res);
  }
};
