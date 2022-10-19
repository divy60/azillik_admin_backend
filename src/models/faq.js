import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";

const schema = {
  faq_id: {
    type: String,
    default: uuidv4,
  },
  question: String,
  answer: String,
};

const modelName = "faq";
let FAQModel = DBOperation.createModel(modelName, schema);

let faqModel = new SchemaModel(FAQModel);

export default faqModel;
