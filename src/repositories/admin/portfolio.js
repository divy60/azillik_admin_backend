import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import portfolioModel from "../../models/portfolio";

export const addPortfolio = async (body, files) => {
  logger.log(level.info, `>> addPortfolio()`);

  let addedPortfolioData = {
    ...body,
    case_study: JSON.parse(body.case_study),
  };

  if (files && files.portfolio_image) {
    let images = [];

    if (Array.isArray(files.portfolio_image)) {
      await Promise.all(
        files.portfolio_image.map(async (fileDoc, i) => {
          let url = await uploadFile(
            fileDoc.data,
            `portfolio-${i}-${fileDoc.name}`,
            fileDoc.mimetype,
            AWS_BUCKET_CONST.BUCKET_ADMIN
          );

          images.push(url);
        })
      );
    } else {
      let fileDoc = files.portfolio_image;
      let url = await uploadFile(
        fileDoc.data,
        `portfolio-${fileDoc.name}`,
        fileDoc.mimetype,
        AWS_BUCKET_CONST.BUCKET_ADMIN
      );
      images.push(url);
    }
    addedPortfolioData.portfolio_image = images;
  }

  if (files && files.project_specification_image) {
    let fileDoc = files.project_specification_image;
    let url = await uploadFile(
      fileDoc.data,
      `portfolio-specification-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedPortfolioData.project_specification_image = url;
  }
  if (files && files.portfolio_image1) {
    let fileDoc = files.portfolio_image1;
    let url = await uploadFile(
      fileDoc.data,
      `portfolio-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedPortfolioData.portfolio_image1 = url;
  }

  await portfolioModel.add(addedPortfolioData);
  let data = {
    message: "succ_66",
  };
  return data;
};

export const getAllPortfolios = async (options) => {
  logger.log(level.info, `>> getAllPortfolios()`);
  let data = {};

  const portfolioData = await portfolioModel.get({}, "", options);
  if (portfolioData && portfolioData.length > 0) {
    const count = await portfolioModel.count({});
    data = {
      message: "succ_67",
      count,
      data: portfolioData,
    };
  } else {
    data = {
      message: "succ_67",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updatePortfolio = async (body, files, query) => {
  logger.log(level.info, `>> updatePortfolio()`);

  let updatedPortfolioData = {
    ...body,
    case_study: JSON.parse(body.case_study),
  };
  if (files && files.portfolio_image) {
    let images = [];

    if (body.existing_images && body.existing_images.length > 0) {
      body.existing_images = JSON.parse(JSON.stringify(body.existing_images));
      body.existing_images.map((img) => images.push(img));
    }

    if (Array.isArray(files.portfolio_image)) {
      await Promise.all(
        files.portfolio_image.map(async (fileDoc, i) => {
          let url = await uploadFile(
            fileDoc.data,
            `portfolio-${i}-${fileDoc.name}`,
            fileDoc.mimetype,
            AWS_BUCKET_CONST.BUCKET_ADMIN
          );

          images.push(url);
        })
      );
    } else {
      let fileDoc = files.portfolio_image;
      let url = await uploadFile(
        fileDoc.data,
        `portfolio-${fileDoc.name}`,
        fileDoc.mimetype,
        AWS_BUCKET_CONST.BUCKET_ADMIN
      );
      images.push(url);
    }
    updatedPortfolioData.portfolio_image = images;
  }

  if (files && files.project_specification_image) {
    let fileDoc = files.project_specification_image;
    let url = await uploadFile(
      fileDoc.data,
      `portfolio-specification-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedPortfolioData.project_specification_image = url;
  }
  if (files && files.portfolio_image1) {
    let fileDoc = files.portfolio_image1;
    let url = await uploadFile(
      fileDoc.data,
      `portfolio-specification-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedPortfolioData.portfolio_image1 = url;
  }
  await portfolioModel.update(
    { portfolio_id: query.portfolio_id },
    { $set: updatedPortfolioData }
  );
  const data = {
    message: "succ_68",
  };
  return data;
};

export const deletePortfolio = async (query) => {
  logger.log(level.info, `>> deletePortfolio()`);
  await portfolioModel.delete({
    portfolio_id: query.portfolio_id,
  });
  const data = {
    message: "succ_69",
  };
  return data;
};
