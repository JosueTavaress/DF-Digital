import userBodyValidator from "./user-body-validator";
import authBodyValidator from "./auth-body-validator";
import tagBodyValidator from "./tag-body-validator";

export default [
  ...userBodyValidator,
  authBodyValidator,
  tagBodyValidator
]