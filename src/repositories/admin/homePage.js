import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import homePageModel from "../../models/homePage";

export const addHomePageSlider = async (body, files) => {
  logger.log(level.info, `>> addHomePageSlider()`);

  let addedHomePageData = {
    ...body,
  };

  if (files && files.slider_image) {
    let fileDoc = files.slider_image;
    let url = await uploadFile(
      fileDoc.data,
      `home-slider-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedHomePageData.slider_image = url;
  }
  await homePageModel.add(addedHomePageData);
  let data = {
    message: "succ_51",
  };
  return data;
};

export const getAllHomePages = async (options) => {
  logger.log(level.info, `>> getAllHomePages()`);
  let data = {};

  const homePageData = await homePageModel.get({}, "", options);
  if (homePageData && homePageData.length > 0) {
    const count = await homePageModel.count({});
    data = {
      message: "succ_52",
      count,
      data: homePageData,
    };
  } else {
    data = {
      message: "succ_52",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updateHomePageData = async (body, files, query) => {
  logger.log(level.info, `>> updateHomePageData()`);

  let updatedHomePageData = {
    ...body,
  };
  if (files && files.slider_image) {
    let fileDoc = files.slider_image;
    let url = await uploadFile(
      fileDoc.data,
      `home-slider-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedHomePageData.slider_image = url;
  }
  await homePageModel.update(
    { home_page_id: query.home_page_id },
    { $set: updatedHomePageData }
  );
  const data = {
    message: "succ_53",
  };
  return data;
};

export const deleteHomePageData = async (query) => {
  logger.log(level.info, `>> deleteHomePageData()`);
  await homePageModel.delete({
    home_page_id: query.home_page_id,
  });
  const data = {
    message: "succ_54",
  };
  return data;
};
