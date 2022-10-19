import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  technology_id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  image: String,
};

const modelName = "technology";
let TechnologyModel = DBOperation.createModel(modelName, schema);

let technologyModel = new SchemaModel(TechnologyModel);

export default technologyModel;
