import DBOperation from "../services/database/database_operation";
import SchemaModel from "../services/database/schema_model";
import { v4 as uuidv4 } from "uuid";
import { encryptText, decryptText } from "../utils/utility";

const schema = {
  contact_id: {
    type: String,
    default: uuidv4,
  },
  firstname: String,
  lastname: String,
  phone_number: String,
  wp_number: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    lowercase: true,
    set: encryptText,
    get: decryptText,
  },
  message: String,
  contact_image: String,
};

const modelName = "contact_us";
let ContactUsModel = DBOperation.createModel(modelName, schema);

let contactUsModel = new SchemaModel(ContactUsModel);

export default contactUsModel;
