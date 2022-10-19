import { logger, level } from "../../config/logger";
import productModel from "../../models/product";
import pillarModel from "../../models/our_pillars";
import homePageModel from "../../models/homePage";
import faqModel from "../../models/faq";
import productGrowthModel from "../../models/product_growth";
import configModel from "../../models/config";
import portfolioModel from "../../models/portfolio";
import technologyModel from "../../models/technology";
import blogModel from "../../models/blog";
import * as blogPipeline from "../../aggregate_pipeline/user/blog";
import * as utilityFunctions from "../../utils/utility";

export const getAllProducts = async (options) => {
  logger.log(level.info, `>> getAllProducts()`);
  let data = {};

  const productData = await productModel.get({}, "", options);
  if (productData && productData.length > 0) {
    const count = await productModel.count({});
    data = {
      message: "succ_22",
      count,
      data: productData,
    };
  } else {
    data = {
      message: "succ_22",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllPillars = async (options) => {
  logger.log(level.info, `>> getAllPillars()`);
  let data = {};

  const pillarData = await pillarModel.get({}, "", options);
  if (pillarData && pillarData.length > 0) {
    const count = await pillarModel.count({});
    data = {
      message: "succ_27",
      count,
      data: pillarData,
    };
  } else {
    data = {
      message: "succ_27",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllHomePages = async (options) => {
  logger.log(level.info, `>> getAllHomePages()`);
  let data = {};

  const homePageData = await homePageModel.get({}, "", options);
  if (homePageData && homePageData.length > 0) {
    const count = await homePageModel.count({});
    data = {
      message: "succ_52",
      count,
      data: homePageData,
    };
  } else {
    data = {
      message: "succ_52",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllFAQs = async (options) => {
  logger.log(level.info, `>> getAllFAQs()`);
  let data = {};

  const faqData = await faqModel.get({}, "", options);
  if (faqData && faqData.length > 0) {
    const count = await faqModel.count({});
    data = {
      message: "succ_56",
      count,
      data: faqData,
    };
  } else {
    data = {
      message: "succ_56",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllProductGrowths = async (options) => {
  logger.log(level.info, `>> getAllProductGrowths()`);
  let data = {};

  const faqData = await productGrowthModel.get({}, "", options);
  if (faqData && faqData.length > 0) {
    const count = await productGrowthModel.count({});
    data = {
      message: "succ_62",
      count,
      data: faqData,
    };
  } else {
    data = {
      message: "succ_62",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getConfigs = async (options) => {
  logger.log(level.info, `>> getConfigs()`);
  let data = {};

  const configData = await configModel.get({}, "", options);
  if (configData && configData.length > 0) {
    const count = await configModel.count({});
    data = {
      message: "succ_60",
      count,
      data: configData,
    };
  } else {
    data = {
      message: "succ_60",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllPortfolios = async (options) => {
  logger.log(level.info, `>> getAllPortfolios()`);
  let data = {};

  const portfolioData = await portfolioModel.get({}, "", options);
  if (portfolioData && portfolioData.length > 0) {
    const count = await portfolioModel.count({});
    data = {
      message: "succ_67",
      count,
      data: portfolioData,
    };
  } else {
    data = {
      message: "succ_67",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllTechnologies = async (options) => {
  logger.log(level.info, `>> getAllTechnologies()`);
  let data = {};

  const techData = await technologyModel.get({}, "", options);
  if (techData && techData.length > 0) {
    const count = await technologyModel.count({});
    data = {
      message: "succ_72",
      count,
      data: techData,
    };
  } else {
    data = {
      message: "succ_72",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const getAllBlogs = async (query, options) => {
  logger.log(level.info, `>> getAllBlogs()`);
  let data = {};
  let filter = {};
  if (query.tag) {
    filter = { ...filter, tag: { $regex: query.tag, $options: "i" } };
  }
  if (query.admin) {
    filter = { ...filter, admin_id: query.admin };
  }

  const blogData = await blogModel.aggregate(
    blogPipeline.getPipelineForBlog(filter, options)
  );

  let countPipeline = blogPipeline.getPipelineForBlog(filter, {}, true);

  if (blogData && blogData.length > 0) {
    let count = await utilityFunctions.getCountPipeline(
      blogModel,
      blogData,
      countPipeline
    );
    data = {
      message: "succ_72",
      count,
      data: blogData,
    };
  } else {
    data = {
      message: "succ_72",
      count: 0,
      data: [],
    };
  }
  return data;
};
