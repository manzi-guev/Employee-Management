/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Joi from '@hapi/joi';

const signUp = (req, res, next) => {
  const schema = {
    name: Joi.string()
      .strict()
      .trim()
      .required(),
    nationalId: Joi.string()
      .strict()
      .min(16)
      .trim()
      .required(),
    phonenumber: Joi.string()
      .strict()
      .required()
      .trim(),
    email: Joi.string()
      .strict()
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .strict()
      .required()
      .trim(),
    dateOfBirth: Joi.date().iso()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  req.user = schema;
  next();
};
const signIn = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const createEmployee = (req, res, next) => {
  const schema = {
    employeeName: Joi.string()
      .strict()
      .trim()
      .required(),
    nationalId: Joi.string()
      .strict()
      .trim()
      .min(16)
      .required(),
    phoneNumber: Joi.string()
      .strict()
      .required()
      .trim(),
    email: Joi.string()
      .strict()
      .trim()
      .required()
      .email(),
    dateOfBirth: Joi.date().iso(),
    position: Joi.string()
      .strict()
      .required()
      .trim()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const activateEmp = (req, res, next) => {
  const schema = {
    status: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const suspendEmp = (req, res, next) => {
  const schema = {
    status: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
export {
  signIn,
  signUp,
  createEmployee,
  activateEmp,
  suspendEmp
};