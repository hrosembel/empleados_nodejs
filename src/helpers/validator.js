import validator from "validator";
import { ValidationError } from "../errorClasses.js";

export const userValidator = (params) => {
  //Validar nulos
  validateEmptyFields({
    name: params.name,
    surname: params.surname,
    nick: params.nick,
    email: params.email,
    password: params.password,
  });

  if (validator.isEmail(params.email)) {
    throw new ValidationError("format is wrong", "email");
  }
};

export const employeeValidator = (params) => {
  if (validator.isEmpty(params.name)) {
    throw new Error("Validation error");
  }
};

export const loginValidator = (params) => {
  //Validar nulos
  if (params.email) {
    validateEmptyFields({
      email: params.email,
      password: params.password,
    });
  }
  if (params.nick) {
    validateEmptyFields({
      nick: params.nick,
      password: params.password,
    });
  }
};

const validateEmptyFields = (fieldList) => {
  Object.entries(fieldList).forEach(([key, value]) => {
    if (validator.isEmpty(value)) {
      throw new ValidationError("cannot be empty", key);
    }
  });
};
