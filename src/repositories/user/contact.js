import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import contactUsModel from "../../models/contactUs";
import applyJobModel from "../../models/applyJob";
import internshipModel from "../../models/internship";
import weWorkModel from "../../models/weWork";

export const addContactUs = async (body, files) => {
  logger.log(level.info, `>> addContactUs()`);

  let addedContactData = {
    ...body,
  };

  if (files && files.contact_image) {
    let fileDoc = files.contact_image;
    let url = await uploadFile(
      fileDoc.data,
      `contact-us-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedContactData.contact_image = url;
  }
  await contactUsModel.add(addedContactData);
  let data = {
    message: "succ_31",
  };
  return data;
};

export const applyJob = async (body, files) => {
  logger.log(level.info, `>> applyJob()`);
  let data = {};

  let addedApplyJobData = {
    ...body,
  };

  if (files === null) {
    data = { error: true, message: "err_39" };
    return data;
  }

  if (files && files.apply_job_image) {
    let fileDoc = files.apply_job_image;
    let url = await uploadFile(
      fileDoc.data,
      `apply-job-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedApplyJobData.apply_job_image = url;
  }
  await applyJobModel.add(addedApplyJobData);
  data = {
    error: false,
    message: "succ_32",
  };
  return data;
};

export const applyInternship = async (body, files) => {
  logger.log(level.info, `>> applyInternship()`);
  let data = {};

  let addedApplyInternshipData = {
    ...body,
  };

  if (files === null) {
    data = { error: true, message: "err_39" };
    return data;
  }

  if (files && files.internship_image) {
    let fileDoc = files.internship_image;
    let url = await uploadFile(
      fileDoc.data,
      `apply-internship-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedApplyInternshipData.internship_image = url;
  }
  await internshipModel.add(addedApplyInternshipData);
  data = {
    error: false,
    message: "succ_33",
  };
  return data;
};

export const weWorkOn = async (body, files) => {
  logger.log(level.info, `>> weWorkOn()`);
  let data = {};

  let addedWeWorkOnData = {
    ...body,
  };

  if (files === null) {
    data = { error: true, message: "err_41" };
    return data;
  }

  if (files && files.documentation) {
    let fileDoc = files.documentation;
    let url = await uploadFile(
      fileDoc.data,
      `we-work-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedWeWorkOnData.documentation = url;
  }

  await weWorkModel.add(addedWeWorkOnData);
  data = {
    error: false,
    message: "succ_34",
  };
  return data;
};
