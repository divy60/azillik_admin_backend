import { logger, level } from "../../config/logger";
import configModel from "../../models/config";

export const addConfig = async (body) => {
  logger.log(level.info, `>> addConfig()`);
  let data = {};
  const configData = await configModel.get({});

  if (configData && configData.length > 0) {
    await configModel.update({}, { $set: { ...body } });
    data = {
      message: "succ_59",
    };
    return data;
  } else {
    await configModel.add({ ...body });
    data = {
      message: "succ_59",
    };
    return data;
  }
};

export const getConfigs = async (options) => {
  logger.log(level.info, `>> getConfigs()`);
  let data = {};

  const configData = await configModel.get({}, "", options);
  if (configData && configData.length > 0) {
    const count = await configModel.count({});
    data = {
      message: "succ_60",
      count,
      data: configData,
    };
  } else {
    data = {
      message: "succ_60",
      count: 0,
      data: [],
    };
  }
  return data;
};
