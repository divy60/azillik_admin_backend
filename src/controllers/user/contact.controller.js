import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  serverError,
  successResponse,
} from "../../utils/utility";
import * as contactRepo from "../../repositories/user/contact";

export const addContactUs = async (req, res) => {
  logger.log(level.debug, `>> addContactUs()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const contactData = await contactRepo.addContactUs(req.body, req.files);
    successResponse(res, contactData);
  } catch (error) {
    logger.log(level.error, `<< addContactUs error=${error}`);
    serverError(res);
  }
};

export const applyJob = async (req, res) => {
  logger.log(level.debug, `>> applyJob()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const applyJobData = await contactRepo.applyJob(req.body, req.files);
    if (applyJobData.error) return badRequestError(res, applyJobData.message);
    successResponse(res, applyJobData);
  } catch (error) {
    logger.log(level.error, `<< applyJob error=${error}`);
    serverError(res);
  }
};

export const applyInternship = async (req, res) => {
  logger.log(level.debug, `>> applyInternship()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const applyInternshipData = await contactRepo.applyInternship(
      req.body,
      req.files
    );
    if (applyInternshipData.error)
      return badRequestError(res, applyInternshipData.message);
    successResponse(res, applyInternshipData);
  } catch (error) {
    logger.log(level.error, `<< applyInternship error=${error}`);
    serverError(res);
  }
};

export const weWorkOn = async (req, res) => {
  logger.log(level.debug, `>> weWorkOn()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return badRequestError(res, errors);
    }
    const weWorkOnData = await contactRepo.weWorkOn(req.body, req.files);
    if (weWorkOnData.error) return badRequestError(res, weWorkOnData.message);
    successResponse(res, weWorkOnData);
  } catch (error) {
    logger.log(level.error, `<< weWorkOn error=${error}`);
    serverError(res);
  }
};
