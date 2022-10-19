import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  portfolio_id: {
    type: String,
    default: uuidv4,
  },
  portfolio_image: [String],
  title: String,
  description: String,
  case_study: [
    {
      _id: false,
      sub_title: String,
      sub_description: String,
      sub_image: String,
    },
  ],
  project_specification: {
    type: Boolean,
    default: false,
  },
  technology_used: String,
  frontend: String,
  backend: String,
  resource: Number,
  duration: String,
  project_specification_image: String,
  portfolio_image1: String,
};

const modelName = "portfolio";
let PortfolioModel = DBOperation.createModel(modelName, schema);

let portfolioModel = new SchemaModel(PortfolioModel);

export default portfolioModel;
