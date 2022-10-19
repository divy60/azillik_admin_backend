/**
 * API Routes
 */

import { Router } from "express";
import git from "git-last-commit";
import HTTPStatus from "http-status";
const status = "backend service is running";
const routes = new Router();
import AdminUserRoutes from "./admin/admin.routes";
import ContactUsRoutes from "./user/contact.routes";

const PATH = {
  ROOT: "/",
  ADMIN: "/admin",
  USER: "/user",
};

routes.get(PATH.ROOT, (_req, res) => {
  try {
    git.getLastCommit((err, commit) => {
      if (err) {
        return res.status(HTTPStatus.OK).json({
          status,
        });
      }
      return res.status(HTTPStatus.OK).json({
        status,
        info: commit.hash,
      });
    });
  } catch (error) {
    return res.status(HTTPStatus.OK).json({
      status,
    });
  }
});

routes.use(PATH.ADMIN, AdminUserRoutes);
routes.use(PATH.USER, ContactUsRoutes);

export default routes;
