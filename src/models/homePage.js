import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  home_page_id: {
    type: String,
    default: uuidv4,
  },
  slider_image: String,
  slider_link: String,
};

const modelName = "home_page";
let HomePageModel = DBOperation.createModel(modelName, schema);

let homePageModel = new SchemaModel(HomePageModel);

export default homePageModel;
