import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";
import { encryptText, decryptText } from "../utils/utility";

const schema = {
  we_work_id: {
    type: String,
    default: uuidv4,
  },
  skill: String,
  phone_number: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    lowercase: true,
    set: encryptText,
    get: decryptText,
  },
  firstname: String,
  lastname: String,
  hiring_needs: String,
  work_type: String,
  whatsapp_number: String,
  website: String,
  developer_team: String,
  documentation: String,
};

const modelName = "we_work";
let WeWorkModel = DBOperation.createModel(modelName, schema);

let weWorkModel = new SchemaModel(WeWorkModel);

export default weWorkModel;
