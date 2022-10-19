import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
} from "../../utils/utility";
import * as configRepo from "../../repositories/admin/config";

export const addConfig = async (req, res) => {
  logger.log(level.debug, `>> addConfig()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const configData = await configRepo.addConfig(req.body);
    successResponse(res, configData);
  } catch (error) {
    logger.log(level.error, `<< addConfig error=${error}`);
    serverError(res);
  }
};

export const getConfigs = async (req, res) => {
  logger.log(level.debug, `>> getConfigs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await configRepo.getConfigs(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getConfigs error=${error}`);
    serverError(res);
  }
};
