import { logger, level } from "../../config/logger";

export const getPipelineForBlog = (filter, extraParams, count) => {
  logger.log(level.info, `>> getPipelineForBlog()`);
  let pipeline = [
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "adminusers",
        localField: "admin_id",
        foreignField: "admin_id",
        as: "admin",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "user_id",
        as: "userData",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        tag: 1,
        blog_content: 1,
        blog_image: 1,
        admin_firstname: { $arrayElemAt: ["$admin.firstname", 0] },
        admin_lastname: { $arrayElemAt: ["$admin.lastname", 0] },
        admin_profile: { $arrayElemAt: ["$admin.profile_image", 0] },
        admin_id: { $arrayElemAt: ["$admin.admin_id", 0] },
        firstname: { $arrayElemAt: ["$userData.firstname", 0] },
        lastname: { $arrayElemAt: ["$userData.lastname", 0] },
        profile_image: { $arrayElemAt: ["$userData.profile_image", 0] },
        user_id: { $arrayElemAt: ["$userData.user_id", 0] },
        created_at: 1,
      },
    },
    { $sort: { created_at: -1 } },
  ];
  if (count) {
    pipeline.push({
      $count: "total",
    });
  }
  if (extraParams) {
    if (extraParams.skip) pipeline.push({ $skip: Number(extraParams.skip) });
    if (extraParams.limit) pipeline.push({ $limit: Number(extraParams.limit) });
  }
  return pipeline;
};
