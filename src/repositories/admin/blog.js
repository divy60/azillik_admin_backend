import { logger, level } from "../../config/logger";
import { uploadFile } from "../../services/aws/aws";
import { constants as AWS_BUCKET_CONST } from "../../constant/aws";
import blogModel from "../../models/blog";

export const addBlog = async (body, files, admin_id) => {
  logger.log(level.info, `>> addBlog()`);

  let addedBlogData = {
    ...body,
    admin_id,
  };

  if (files && files.blog_image) {
    let fileDoc = files.blog_image;
    let url = await uploadFile(
      fileDoc.data,
      `blog-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    addedBlogData.blog_image = url;
  }

  await blogModel.add(addedBlogData);
  let data = {
    message: "succ_76",
  };
  return data;
};

export const getAllBlogs = async (options) => {
  logger.log(level.info, `>> getAllBlogs()`);
  let data = {};

  const blogData = await blogModel.get({}, "", options);
  if (blogData && blogData.length > 0) {
    const count = await blogModel.count({});
    data = {
      message: "succ_77",
      count,
      data: blogData,
    };
  } else {
    data = {
      message: "succ_77",
      count: 0,
      data: [],
    };
  }
  return data;
};

export const updateBlog = async (body, files, query) => {
  logger.log(level.info, `>> updateBlog()`);

  let updatedBlogData = {
    ...body,
  };

  if (files && files.blog_image) {
    let fileDoc = files.blog_image;
    let url = await uploadFile(
      fileDoc.data,
      `blog-${fileDoc.name}`,
      fileDoc.mimetype,
      AWS_BUCKET_CONST.BUCKET_ADMIN
    );
    updatedBlogData.blog_image = url;
  }

  await blogModel.update({ blog_id: query.blog_id }, { $set: updatedBlogData });
  const data = {
    message: "succ_78",
  };
  return data;
};

export const deleteBlog = async (query) => {
  logger.log(level.info, `>> deleteBlog()`);
  await blogModel.delete({
    blog_id: query.blog_id,
  });
  const data = {
    message: "succ_79",
  };
  return data;
};
