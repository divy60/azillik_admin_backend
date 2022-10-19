import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  config_id: {
    type: String,
    default: uuidv4,
  },
  years_experience: Number,
  successfull_rate: Number,
  solution: Number,
  clients: Number,
};

const modelName = "config";
let ConfigModel = DBOperation.createModel(modelName, schema);

let configModel = new SchemaModel(ConfigModel);

export default configModel;
