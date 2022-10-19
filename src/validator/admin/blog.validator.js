import { body, query } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/admin";
import blogModel from "../../models/blog";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_BLOG: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
        body("blog_content", "err_76").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.EDIT_BLOG: {
      error = [
        body("title", "err_21").not().isEmpty(),
        body("description", "err_22").not().isEmpty(),
        body("blog_content", "err_76").not().isEmpty(),
        query("blog_id", "err_77").not().isEmpty().custom(isBlogExist),
      ];
      break;
    }
    case VALIDATOR.DELETE_BLOG: {
      error = [query("blog_id", "err_77").not().isEmpty().custom(isBlogExist)];
      break;
    }
  }
  return error;
};

const isBlogExist = async (value) => {
  const isBlogExist = await blogModel.isExist({
    blog_id: value,
  });
  if (!isBlogExist) throw new Error("err_78");
};
