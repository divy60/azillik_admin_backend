import { logger, level } from "../../config/logger";
import { encrypt, decrypt, orderOTPGenerator } from "../../utils/utility";
import adminModel from "../../models/admin";
import JWTAuth from "../../services/jwt_auth/jwt_auth";
import crypto from "crypto";
import _ from "lodash";

export const addAdmin = async (body) => {
  logger.log(level.info, `>> addAdmin body=${JSON.stringify(body)}`);
  const encryptPassword = await encrypt(body.password);
  const admin = await adminModel.add({
    ...body,
    password: encryptPassword,
    status: 1,
  });
  return admin;
};

export const loginAdmin = async (body) => {
  let object;
  let { email, password } = body;

  const [adminDoc] = await adminModel.get({
    email,
  });

  const decryptPassword = await decrypt(password, adminDoc.password);
  if (decryptPassword) {
    const tokenPayload = {
      id: adminDoc._id,
      admin_id: adminDoc.admin_id,
      email: adminDoc.email,
    };
    const auth = new JWTAuth();
    const accessToken = await auth.createToken(tokenPayload);

    let payload = {
      ...tokenPayload,
      accessToken,
    };

    object = {
      message: "succ_2",
      data: payload,
    };
  }
  let data = { object, decryptPassword };
  return data;
};

export const forgetPassword = async (params) => {
  let { email } = params;
  const token = crypto.randomBytes(32).toString("hex");
  let password_reset_otp = orderOTPGenerator();
  const updateToken = { password_reset_token: token, password_reset_otp };
  const updateUser = await adminModel.update({ email }, updateToken);
  return updateUser;
};

export const resetPwdOTP = async (body, adminDoc) => {
  const { email, newPassword, password_reset_otp } = body;
  if (
    adminDoc &&
    adminDoc.password_reset_otp &&
    adminDoc.password_reset_otp === password_reset_otp
  ) {
    const tokenFilter = { password_reset_otp, email };
    const encryptPassword = await encrypt(newPassword);
    const updatePassword = {
      password: encryptPassword,
    };
    let removeField = { password_reset_token: "", password_reset_otp: "" };
    await adminModel.update(tokenFilter, {
      $set: updatePassword,
      $unset: removeField,
    });
    return true;
  } else {
    return false;
  }
};

export const adminAccount = async (adminId) => {
  let excludedFields =
    "-password_reset_token -role -verify -is_active -password -is_deleted -verification_token -created_at -updated_at -__v";

  let [getMyAccount] = await adminModel.get(
    { admin_id: adminId, status: 1 },
    excludedFields
  );
  logger.log(
    level.debug,
    `>> adminAccount account data ${JSON.stringify(getMyAccount)} `
  );

  return getMyAccount;
};

export const updateAccount = async (filter, updateData) => {
  updateData = _.pickBy(updateData);
  let updatedAdmin = await adminModel.update(filter, {
    $set: updateData,
  });

  return updatedAdmin;
};

export const getAdminData = async (filter = {}) => {
  let adminData = await adminModel.get(filter);
  let data = {};
  let isAdmin = false;

  if (adminData && adminData.length > 0) {
    isAdmin = true;
    adminData = adminData[0];
    data = { adminData, isAdmin };
  } else {
    data = { isAdmin };
  }
  return data;
};
