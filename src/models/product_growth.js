import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  product_growth_id: {
    type: String,
    default: uuidv4,
  },
  question: String,
  answer: String,
};

const modelName = "product_growth";
let ProductGrowthModel = DBOperation.createModel(modelName, schema);

let productGrowthModel = new SchemaModel(ProductGrowthModel);

export default productGrowthModel;
