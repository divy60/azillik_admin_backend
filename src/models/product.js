import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  product_id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  description: String,
  product_image: String,
  product_link: String,
  sub_title: String,
  sub_title_color: String,
  sub_title_backgroung_color: String,
  product_link_color: String,
  background_color: String,
  position: String,
};

const modelName = "product";
let ProductModel = DBOperation.createModel(modelName, schema);

let productModel = new SchemaModel(ProductModel);

export default productModel;
