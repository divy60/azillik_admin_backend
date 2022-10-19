import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  pillar_id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  position: String,
  pillar_image: String,
  description: String,
};

const modelName = "our_pillar";
let PillarModel = DBOperation.createModel(modelName, schema);

let pillarModel = new SchemaModel(PillarModel);

export default pillarModel;
