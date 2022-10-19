import { body, query } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/admin";
import portfolioModel from "../../models/portfolio";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_PORTFOLIO: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.EDIT_PORTFOLIO: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
        query("portfolio_id", "err_66")
          .not()
          .isEmpty()
          .custom(isPortfolioExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_PORTFOLIO: {
      error = [
        query("portfolio_id", "err_66").not().isEmpty().custom(isPortfolioExist),
      ];
      break;
    }
  }
  return error;
};

const isPortfolioExist = async (value) => {
  const isPortfolioExist = await portfolioModel.isExist({
    portfolio_id: value,
  });
  if (!isPortfolioExist) throw new Error("err_67");
};
