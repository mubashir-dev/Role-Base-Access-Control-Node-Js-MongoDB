const Role = require("../models/role.model");
const ObjectId = require('mongoose').Types.ObjectId;
const httpError = require("http-errors");
const passwordHash = require("../helpers/password.hash");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/jwt.auth");
const userData = require("../helpers/user");
const {roleSchema} = require('../validations/role.validate');
const _ = require('underscore');

//create role
exports.create = async (req, res, next) => {
    try {
        const validationResult = roleSchema.validate(req.body, {abortEarly: false});
        if (!_.isEmpty(validationResult.error)) {
            let _errors = [];
            validationResult.error.details.forEach((element) => {
                _errors.push(element.message);
            });
            res.status(422).send({
                errors: _errors
            });
        } else {
            const nameExist = await Role.findOne({name: req.body.name})
            if (nameExist) {
                next(new httpError(422, {
                    message: `This ${req.body.name} role is already exists in record`
                }));
            }
            const role = new Role({
                name: req.body.name,
                description: req.body.description,
            })
            const result = await role.save();

            res.status(200).send({
                message: "Role has been Created",
                role: result
            });
        }

    } catch (error) {
        next(new httpError(500, {
            message: error
        }));
    }
}

//edit role
exports.edit = async (req, res, next) => {
    try {
        const validationResult = roleSchema.validate(req.body, {abortEarly: false});
        if (!_.isEmpty(validationResult.error)) {
            let _errors = [];
            validationResult.error.details.forEach((element) => {
                _errors.push(element.message);
            });
            res.status(422).send({
                errors: _errors
            });
        } else {

            const nameExist = await Role.findOne({name: req.body.name})
            if (nameExist) {
                next(new httpError(422, {
                    message: `This ${req.body.name} role is already exists in record`
                }));
            }
            const result = await Role.update({_id: req.params.id}, {
                name: req.body.name,
                description: req.body.description
            });
            if (result.isModified == 1) {
                res.status(200).send({
                    message: "Role has been Updated",
                });
            }
            else
            {
                res.status(409).send({
                    message: "Role has not been Updated",
                });
            }

        }

    } catch (error) {
        next(new httpError(500, {
            message: error
        }));
    }
}

