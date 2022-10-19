import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import technologyModel from "../../models/technology";

export const addTechnology = async (body, files) => {
  logger.log(level.info, `>> addTechnology()`);

  let addedTechnologyData = {
    ...body,
  };

  if (files && files.image) {
    let fileDoc = files.image;
    let url = await uploadFile(
      fileDoc.data,
      `technology-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedTechnologyData.image = url;
  }
  await technologyModel.add(addedTechnologyData);
  let data = {
    message: "succ_71",
  };
  return data;
};

export const getAllTechnologies = async (options) => {
  logger.log(level.info, `>> getAllTechnologies()`);
  let data = {};

  const techData = await technologyModel.get({}, "", options);
  if (techData && techData.length > 0) {
    const count = await technologyModel.count({});
    data = {
      message: "succ_72",
      count,
      data: techData,
    };
  } else {
    data = {
      message: "succ_72",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updateTechnology = async (body, files, query) => {
  logger.log(level.info, `>> updateTechnology()`);

  let updatedTech = {
    ...body,
  };
  if (files && files.image) {
    let fileDoc = files.image;
    let url = await uploadFile(
      fileDoc.data,
      `technology-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedTech.image = url;
  }
  await technologyModel.update(
    { technology_id: query.technology_id },
    { $set: updatedTech }
  );
  const data = {
    message: "succ_73",
  };
  return data;
};

export const deleteTechnology = async (query) => {
  logger.log(level.info, `>> deleteTechnology()`);
  await technologyModel.delete({
    technology_id: query.technology_id,
  });
  const data = {
    message: "succ_74",
  };
  return data;
};
