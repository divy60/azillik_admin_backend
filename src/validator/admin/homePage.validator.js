import { body, query } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/admin";
import faqModel from "../../models/faq";
import homePageModel from "../../models/homePage";
import productGrowthModel from "../../models/product_growth";
import technologyModel from "../../models/technology";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_HOME_PAGE: {
      error = [body("slider_link", "err_51").not().isEmpty()];
      break;
    }
    case VALIDATOR.EDIT_HOME_PAGE: {
      error = [
        body("slider_link", "err_51").not().isEmpty(),
        query("home_page_id", "err_52").not().isEmpty().custom(isHomePageExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_HOME_PAGE: {
      error = [
        query("home_page_id", "err_52").not().isEmpty().custom(isHomePageExist),
      ];
      break;
    }
    case VALIDATOR.ADD_FAQ: {
      error = [
        body("question", "err_54").not().isEmpty(),
        body("answer", "err_55").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.EDIT_FAQ: {
      error = [
        body("question", "err_54").not().isEmpty(),
        body("answer", "err_55").not().isEmpty(),
        query("faq_id", "err_56").not().isEmpty().custom(isFAQExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_FAQ: {
      error = [query("faq_id", "err_56").not().isEmpty().custom(isFAQExist)];
      break;
    }
    case VALIDATOR.EDIT_PRODUCT_GROWTH: {
      error = [
        body("question", "err_54").not().isEmpty(),
        body("answer", "err_55").not().isEmpty(),
        query("product_growth_id", "err_58")
          .not()
          .isEmpty()
          .custom(isProductGrowthExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_PRODUCT_GROWTH: {
      error = [
        query("product_growth_id", "err_58")
          .not()
          .isEmpty()
          .custom(isProductGrowthExist),
      ];
      break;
    }
    case VALIDATOR.ADD_TECH: {
      error = [body("title", "err_21").not().isEmpty()];
      break;
    }
    case VALIDATOR.EDIT_TECH: {
      error = [
        body("title", "err_21").not().isEmpty(),
        query("technology_id", "err_71")
          .not()
          .isEmpty()
          .custom(isTechnologyExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_TECH: {
      error = [
        query("technology_id", "err_71")
          .not()
          .isEmpty()
          .custom(isTechnologyExist),
      ];
      break;
    }
  }
  return error;
};

const isHomePageExist = async (value) => {
  const isHomePageExist = await homePageModel.isExist({
    home_page_id: value,
  });
  if (!isHomePageExist) throw new Error("err_53");
};

const isFAQExist = async (value) => {
  const isFAQExist = await faqModel.isExist({
    faq_id: value,
  });
  if (!isFAQExist) throw new Error("err_57");
};

const isProductGrowthExist = async (value) => {
  const isProductGrowthExist = await productGrowthModel.isExist({
    product_growth_id: value,
  });
  if (!isProductGrowthExist) throw new Error("err_59");
};

const isTechnologyExist = async (value) => {
  const isTechExist = await technologyModel.isExist({
    technology_id: value,
  });
  if (!isTechExist) throw new Error("err_72");
};
