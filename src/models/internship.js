import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";
import { encryptText, decryptText } from "../utils/utility";

const schema = {
  internship_id: {
    type: String,
    default: uuidv4,
  },
  name: String,
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
  current_job_title: String,
  internship_image: String,
  message: String,
};

const modelName = "internship";
let InternshipModel = DBOperation.createModel(modelName, schema);

let internshipModel = new SchemaModel(InternshipModel);

export default internshipModel;
