import { body, param } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/admin";
import adminModel from "../../models/admin";
import { sendVerificationEmail } from "../../repositories/admin/admin";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADMIN_SIGNUP: {
      error = [
        body("email", "err_7").isEmail().custom(isEmailRegistered),
        body("password")
          .isLength({ min: 8 })
          .withMessage("err_8")
          .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error("err_9");
            } else {
              return value;
            }
          }),
      ];
      break;
    }
    case VALIDATOR.ADMIN_LOGIN: {
      error = [
        body("email", "err_7").isEmail().custom(emailValidation),
        body("password", "err_8").isLength({ min: 8 }),
      ];
      break;
    }
    case VALIDATOR.ADMIN_FORGOT_PASSWORD: {
      error = [param("email", "err_7").isEmail().custom(emailValidation)];
      break;
    }
    case VALIDATOR.CHANGE_PASSWORD_OTP: {
      error = [
        body("email", "err_7").isEmail().custom(emailValidation),
        body("newPassword")
          .isLength({ min: 8 })
          .withMessage("err_8")
          .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error("err_9");
            } else {
              return value;
            }
          }),
        // body('token', 'err_18').not().isEmpty().custom(tokenValidation),
      ];
      break;
    }
    case VALIDATOR.UPDATE_ACCOUNT: {
      error = [
        body("newPassword")
          .optional({ checkFalsy: true })
          .isLength({ min: 8 })
          .withMessage("err_8"),
      ];
      break;
    }
  }
  return error;
};

const isEmailRegistered = async (value) => {
  let emailExist = await adminModel.isExist({
    email: value,
  });

  if (emailExist) throw new Error("err_10");
  return value;
};

const emailValidation = async (value) => {
  let userExist = await adminModel.get({
    email: value,
  });

  if (userExist.length === 0) throw new Error("err_11");
  let { status, oauth_provider } = userExist[0];
  if (status === 0) {
    await sendVerificationEmail(value);
  }
  if (status === 2) throw new Error("err_15");
  if (status === 3) throw new Error("err_14");
  if (oauth_provider === "google") throw new Error("err_16");
  if (oauth_provider === "facebook") throw new Error("err_17");

  return value;
};
