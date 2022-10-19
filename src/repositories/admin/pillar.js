import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import pillarModel from "../../models/our_pillars";

export const addPillar = async (body, files) => {
  logger.log(level.info, `>> addPillar()`);

  let addedPillarData = {
    ...body,
  };

  if (files && files.pillar_image) {
    let fileDoc = files.pillar_image;
    let url = await uploadFile(
      fileDoc.data,
      `pillar-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedPillarData.pillar_image = url;
  }
  await pillarModel.add(addedPillarData);
  let data = {
    message: "succ_26",
  };
  return data;
};

export const getAllPillars = async (options) => {
  logger.log(level.info, `>> getAllPillars()`);
  let data = {};

  const pillarData = await pillarModel.get({}, "", options);
  if (pillarData && pillarData.length > 0) {
    const count = await pillarModel.count({});
    data = {
      message: "succ_27",
      count,
      data: pillarData,
    };
  } else {
    data = {
      message: "succ_27",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updatePillar = async (body, files, query) => {
  logger.log(level.info, `>> updatePillar()`);

  let updatedPillarData = {
    ...body,
  };
  if (files && files.pillar_image) {
    let fileDoc = files.pillar_image;
    let url = await uploadFile(
      fileDoc.data,
      `pillar-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedPillarData.pillar_image = url;
  }
  await pillarModel.update(
    { pillar_id: query.pillar_id },
    { $set: updatedPillarData }
  );
  const data = {
    message: "succ_28",
  };
  return data;
};

export const deletePillar = async (query) => {
  logger.log(level.info, `>> deletePillar()`);
  await pillarModel.delete({
    pillar_id: query.pillar_id,
  });
  const data = {
    message: "succ_29",
  };
  return data;
};
