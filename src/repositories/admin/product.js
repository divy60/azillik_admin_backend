import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import productModel from "../../models/product";

export const addProduct = async (body, files) => {
  logger.log(level.info, `>> addProduct()`);

  let addedProductData = {
    ...body,
  };

  if (files && files.product_image) {
    let fileDoc = files.product_image;
    let url = await uploadFile(
      fileDoc.data,
      `product-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedProductData.product_image = url;
  }
  await productModel.add(addedProductData);
  let data = {
    message: "succ_21",
  };
  return data;
};

export const getAllProducts = async (options) => {
  logger.log(level.info, `>> getAllProducts()`);
  let data = {};

  const productData = await productModel.get({}, "", options);
  if (productData && productData.length > 0) {
    const count = await productModel.count({});
    data = {
      message: "succ_22",
      count,
      data: productData,
    };
  } else {
    data = {
      message: "succ_22",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updateProduct = async (body, files, query) => {
  logger.log(level.info, `>> updateProduct()`);

  let updatedProductData = {
    ...body,
  };
  if (files && files.product_image) {
    let fileDoc = files.product_image;
    let url = await uploadFile(
      fileDoc.data,
      `product-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedProductData.product_image = url;
  }
  await productModel.update(
    { product_id: query.product_id },
    { $set: updatedProductData }
  );
  const data = {
    message: "succ_23",
  };
  return data;
};

export const deleteProduct = async (query) => {
  logger.log(level.info, `>> deleteProduct()`);
  await productModel.delete({
    product_id: query.product_id,
  });
  const data = {
    message: "succ_24",
  };
  return data;
};
