import { logger, level } from "../../config/logger";
import {
  serverError,
  standardStructureStringToJson,
  successResponse,
  getOptionsJson,
  getOptionsPipelineJson,
} from "../../utils/utility";
import * as productRepo from "../../repositories/user/product";

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

export const getAllPillars = async (req, res) => {
  logger.log(level.debug, `>> getAllPillars()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const pillarData = await productRepo.getAllPillars(options);
    successResponse(res, pillarData);
  } catch (error) {
    logger.log(level.error, `<< getAllPillars error=${error}`);
    serverError(res);
  }
};

export const getAllHomePages = async (req, res) => {
  logger.log(level.debug, `>> getAllHomePages()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const homePageData = await productRepo.getAllHomePages(options);
    successResponse(res, homePageData);
  } catch (error) {
    logger.log(level.error, `<< getAllHomePages error=${error}`);
    serverError(res);
  }
};

export const getAllFAQs = async (req, res) => {
  logger.log(level.debug, `>> getAllFAQs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await productRepo.getAllFAQs(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getAllFAQs error=${error}`);
    serverError(res);
  }
};

export const getAllProductGrowths = async (req, res) => {
  logger.log(level.debug, `>> getAllProductGrowths()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await productRepo.getAllProductGrowths(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getAllProductGrowths error=${error}`);
    serverError(res);
  }
};

export const getConfigs = async (req, res) => {
  logger.log(level.debug, `>> getConfigs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const faqData = await productRepo.getConfigs(options);
    successResponse(res, faqData);
  } catch (error) {
    logger.log(level.error, `<< getConfigs error=${error}`);
    serverError(res);
  }
};

export const getAllPortfolios = async (req, res) => {
  logger.log(level.debug, `>> getAllPortfolios()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const portfolioData = await productRepo.getAllPortfolios(options);
    successResponse(res, portfolioData);
  } catch (error) {
    logger.log(level.error, `<< getAllPortfolios error=${error}`);
    serverError(res);
  }
};

export const getAllTechnologies = async (req, res) => {
  logger.log(level.debug, `>> getAllTechnologies()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsJson(extraParams);

  try {
    const techData = await productRepo.getAllTechnologies(options);
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< getAllTechnologies error=${error}`);
    serverError(res);
  }
};

export const getAllBlogs = async (req, res) => {
  logger.log(level.debug, `>> getAllBlogs()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsPipelineJson(extraParams);

  try {
    const techData = await productRepo.getAllBlogs(req.query, options);
    successResponse(res, techData);
  } catch (error) {
    logger.log(level.error, `<< getAllBlogs error=${error}`);
    serverError(res);
  }
};
