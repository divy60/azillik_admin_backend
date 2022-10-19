import { body } from "express-validator";
import { constants as VALIDATOR } from "../../constant/validator/user";
import contactUsModel from "../../models/contactUs";
import applyJobModel from "../../models/applyJob";
import internshipModel from "../../models/internship";
import weWorkModel from "../../models/weWork";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_CONTACT: {
      error = [
        body("email", "err_7").isEmail().custom(isEmailRegistered),
        body("firstname", "err_1").not().isEmpty(),
        body("lastname", "err_2").not().isEmpty(),
        body("phone_number", "err_4").not().isEmpty(),
        body("wp_number", "err_31").not().isEmpty(),
        body("message", "err_32").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.APPLY_JOB: {
      error = [
        body("firstname", "err_1").not().isEmpty(),
        body("lastname", "err_2").not().isEmpty(),
        body("gender", "err_33").not().isEmpty(),
        body("email", "err_7").isEmail().custom(isApplyJobEmailExist),
        body("phone_number", "err_4").not().isEmpty(),
        body("experience_year", "err_34").not().isEmpty(),
        body("age", "err_35").not().isEmpty(),
        body("dob", "err_36").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.APPLY_INTERSHIP: {
      error = [
        body("name", "err_26").not().isEmpty(),
        body("phone_number", "err_4").not().isEmpty(),
        body("email", "err_7").isEmail().custom(isApplyIntershipEmailExist),
        body("current_job_title", "err_40").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.WE_WORK: {
      error = [
        body("firstname", "err_1").not().isEmpty(),
        body("lastname", "err_2").not().isEmpty(),
        body("phone_number", "err_4").not().isEmpty(),
        body("email", "err_7").isEmail().custom(weWorkEmailExist),
        body("phone_number", "err_4").not().isEmpty(),
        body("whatsapp_number", "err_31").not().isEmpty(),
        body("skill", "err_42").not().isEmpty(),
        body("hiring_needs", "err_43").not().isEmpty(),
        body("work_type", "err_44").not().isEmpty(),
      ];
      break;
    }
  }
  return error;
};

const isEmailRegistered = async (value) => {
  let emailExist = await contactUsModel.isExist({
    email: value,
  });

  if (emailExist) throw new Error("err_10");
  return value;
};

const isApplyJobEmailExist = async (value) => {
  let emailExist = await applyJobModel.isExist({
    email: value,
  });
  if (emailExist) throw new Error("err_10");
  return value;
};

const isApplyIntershipEmailExist = async (value) => {
  let emailExist = await internshipModel.isExist({
    email: value,
  });
  if (emailExist) throw new Error("err_10");
  return value;
};

const weWorkEmailExist = async (value) => {
  let emailExist = await weWorkModel.isExist({
    email: value,
  });
  if (emailExist) throw new Error("err_10");
  return value;
};
