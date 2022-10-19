import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  blog_id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  description: String,
  admin_id: {
    type: String,
    ref: "AdminUsers",
  },
  user_id: {
    type: String,
    ref: "users",
  },
  blog_image: String,
  blog_content: String,
  tag: String,
};

const modelName = "blog";
let BlogModel = DBOperation.createModel(modelName, schema);

let blogModel = new SchemaModel(BlogModel);

export default blogModel;
