import { body, query } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/admin";
import productModel from "../../models/product";
import pillarModel from "../../models/our_pillars";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_PRODUCT: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
        body("product_link", "err_23").not().isEmpty(),
        body("sub_title", "err_30").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.EDIT_PRODUCT: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
        body("product_link", "err_23").not().isEmpty(),
        query("product_id", "err_24").not().isEmpty().custom(isProductExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_PRODUCT: {
      error = [
        query("product_id", "err_24").not().isEmpty().custom(isProductExist),
      ];
      break;
    }
    case VALIDATOR.ADD_PILLAR: {
      error = [
        body("name", "err_26").not().isEmpty(),
        body("position", "err_27").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.EDIT_PILLAR: {
      error = [
        body("name", "err_26").not().isEmpty(),
        body("position", "err_27").not().isEmpty(),
        query("pillar_id", "err_28").not().isEmpty().custom(isPillarExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_PILLAR: {
      error = [
        query("pillar_id", "err_28").not().isEmpty().custom(isPillarExist),
      ];
      break;
    }
  }
  return error;
};

const isProductExist = async (value) => {
  const isProductExist = await productModel.isExist({
    product_id: value,
  });
  if (!isProductExist) throw new Error("err_25");
};

const isPillarExist = async (value) => {
  const isPillarExist = await pillarModel.isExist({
    pillar_id: value,
  });
  if (!isPillarExist) throw new Error("err_29");
};
