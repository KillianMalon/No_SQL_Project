import Validator from './validator.js'
import Joi from 'joi'

export default class AuthValidator extends Validator {
  login = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().required()
  })

  signup = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().min(4).required()
  })
}