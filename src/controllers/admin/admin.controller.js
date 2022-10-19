import { logger, level } from "../../config/logger";
import { validationResult } from "express-validator";
import {
  badRequestError,
  successResponse,
  serverError,
  decrypt,
  encrypt,
} from "../../utils/utility";
import * as adminRepo from "../../repositories/admin/admin";
import { uploadFile } from "../../services/aws/aws";
import { v4 as uuidv4 } from "uuid";
import { constants as AWS_CONST } from "../../constant/aws";

export const adminSignup = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> adminSignup()`);

  try {
    if (!errors.isEmpty()) {
      badRequestError(res, errors);
    } else {
      //   const insertedAdmin =
      await adminRepo.addAdmin(req.body);
      //   await sendMailToAdmin(insertedAdmin);
      const data = {
        message: "succ_1",
      };
      successResponse(res, data);
    }
  } catch (e) {
    logger.log(level.error, `adminSignup error=${e}`);
    serverError(res);
  }
};

export const adminLogin = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> adminLogin()`);
  logger.log(level.info, `>> adminLogin body=${JSON.stringify(req.body)}`);

  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    let { decryptPassword, object } = await adminRepo.loginAdmin(req.body);
    if (decryptPassword) {
      successResponse(res, object);
    } else {
      badRequestError(res, "err_13");
    }
  } catch (e) {
    serverError(res);
  }
};

export const adminForgotPassword = async (req, res) => {
  const errors = validationResult(req);
  logger.log(
    level.info,
    `>> adminForgotPassword ${JSON.stringify(req.params)}`
  );

  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    const user = await adminRepo.forgetPassword(req.params);
    // let data = await sendForgetPasswordMail(user);
    const data = {
      message: "succ_3",
      user: user.password_reset_otp,
    };
    successResponse(res, data);
  } catch (e) {
    logger.log(level.error, `forgotPassword ${JSON.stringify(req.params)}`);
    serverError(res);
  }
};

export const changePasswordOtp = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.info, `>> changePasswordOtp `);
  logger.log(
    level.debug,
    `>> changePasswordOtp body=${JSON.stringify(req.body)}`
  );
  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    const adminDoc = await adminRepo.getAdminData({ email: req.body.email });
    let changedPassword = await adminRepo.resetPwdOTP(
      req.body,
      adminDoc.adminData
    );
    if (changedPassword) {
      const data = {
        message: "succ_4",
      };
      return successResponse(res, data);
    } else {
      return badRequestError(res, "err_0");
    }
  } catch (e) {
    logger.log(level.error, `<< changePasswordOtp error=${e}`);
    serverError(res);
  }
};

export const myAdminAccount = async (req, res) => {
  logger.log(level.debug, `>> myAdminAccount() `);
  const { admin_id } = req.currentAdminUser;
  try {
    let userAccount = await adminRepo.adminAccount(admin_id);
    const data = {
      message: "succ_6",
      data: userAccount,
    };
    successResponse(res, data);
  } catch (e) {
    logger.log(level.error, `<< myAdminAccount ${JSON.stringify(e)}`);
    serverError(res);
  }
};

export const updateAdminAccount = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> updateAdminAccount() `);
  const { admin_id } = req.currentAdminUser;
  const filterAdmin = { admin_id, status: 1 };

  const {
    // email,
    firstname,
    lastname,
    country,
    country_code,
    phone_number,
    oldPassword,
    newPassword,
    // confirmPassword,
  } = req.body;
  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);

    logger.log(
      level.info,
      `>> updateAdminAccount body=${JSON.stringify(req.body)}`
    );
    let { isAdmin, adminData } = await adminRepo.getAdminData(filterAdmin);

    if (isAdmin) {
      let updateMyAccountData = {
        firstname,
        lastname,
        phone_number,
        country,
        country_code,
      };

      if (req.files) {
        if (req.files.profile_image) {
          let fileDoc = req.files.profile_image;
          let url = await uploadFile(
            fileDoc.data,
            `/profile/admin-Profile-image-${uuidv4()}-${fileDoc.name}`,
            fileDoc.mimetype,
            AWS_CONST.BUCKET_ADMIN
          );
          updateMyAccountData.profile_image = url;
        }
      }
      //! uncomment above code for aws image storege

      // if (email !== adminDoc.email) {
      //   logger.log(level.debug, `>> updateAdminAccount changeEmail`);
      //   const isEmailExist = await storeOwnerModel.isExist({
      //     email,
      //   });

      //   if (!isEmailExist) {
      //     logger.log(level.debug, `>> updateAdminAccount newEmail=${email}`);
      //     const verificationToken = crypto.randomBytes(3).toString('hex');
      //     const newEmail = email;
      //     const verify = false;
      //     updateMyAccountData.verification_token = verificationToken;
      //     updateMyAccountData.email = newEmail;
      //     updateMyAccountData.verify = verify;
      //   } else {
      //     throw 'This email is already registered.';
      //   }
      // }

      if (oldPassword && newPassword) {
        logger.log(level.debug, `>> updateAdminAccount changePassword`);
        const isOldPasswordMatch = await decrypt(
          oldPassword,
          adminData.password
        );

        if (isOldPasswordMatch) {
          const newStoreOwnerPassword = await encrypt(newPassword);
          updateMyAccountData.password = newStoreOwnerPassword;
        } else {
          return badRequestError(res, "err_19");
        }
      }

      let updatedAdminData = await adminRepo.updateAccount(
        filterAdmin,
        updateMyAccountData
      );
      // if (!updatedAdmin.verify) sendMailToUser(email, updatedAdmin);

      logger.log(
        level.info,
        `>> updateAdminAccount=${JSON.stringify(updatedAdminData)}`
      );
      const data = {
        message: "succ_7",
      };
      successResponse(res, data);
    } else {
      badRequestError(res, "err_11");
    }
  } catch (e) {
    logger.log(level.error, `updateAdminAccount ${JSON.stringify(e)}`);
    serverError(res);
  }
};
