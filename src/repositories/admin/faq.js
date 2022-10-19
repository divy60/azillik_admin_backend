import { logger, level } from "../../config/logger";
import faqModel from "../../models/faq";
import productGrowthModel from "../../models/product_growth";

export const addFAQ = async (body) => {
  logger.log(level.info, `>> addFAQ()`);
  await faqModel.add({ ...body });
  let data = {
    message: "succ_55",
  };
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

export const updateFAQ = async (body, query) => {
  logger.log(level.info, `>> updateFAQ()`);
  await faqModel.update({ faq_id: query.faq_id }, { $set: { ...body } });
  const data = {
    message: "succ_57",
  };
  return data;
};

export const deleteFAQ = async (query) => {
  logger.log(level.info, `>> deleteFAQ()`);
  await faqModel.delete({
    faq_id: query.faq_id,
  });
  const data = {
    message: "succ_58",
  };
  return data;
};

export const addProductGrowth = async (body) => {
  logger.log(level.info, `>> addProductGrowth()`);
  await productGrowthModel.add({ ...body });
  let data = {
    message: "succ_61",
  };
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

export const updateProductGrowth = async (body, query) => {
  logger.log(level.info, `>> updateProductGrowth()`);
  await productGrowthModel.update(
    { product_growth_id: query.product_growth_id },
    { $set: { ...body } }
  );
  const data = {
    message: "succ_63",
  };
  return data;
};

export const deleteProductGrowth = async (query) => {
  logger.log(level.info, `>> deleteProductGrowth()`);
  await productGrowthModel.delete({
    product_growth_id: query.product_growth_id,
  });
  const data = {
    message: "succ_64",
  };
  return data;
};
