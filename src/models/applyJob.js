import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";
import { encryptText, decryptText } from "../utils/utility";

const schema = {
  apply_id: {
    type: String,
    default: uuidv4,
  },
  firstname: String,
  lastname: String,
  phone_number: String,
  gender: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    lowercase: true,
    set: encryptText,
    get: decryptText,
  },
  apply_job_image: String,
  experience_year: Number,
  age: Number,
  dob: Date,
};

const modelName = "apply_job";
let ApplyJobModel = DBOperation.createModel(modelName, schema);

let applyJobModel = new SchemaModel(ApplyJobModel);

export default applyJobModel;
