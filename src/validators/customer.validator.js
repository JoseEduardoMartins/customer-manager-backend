import { check, query } from 'express-validator';
import { select } from '../repositories/customer.repository';
import { customerReturnTypes } from '../utils/sql/customer.query';

const selects = () =>
    query('selects')
        .isString()
        .withMessage('SELECTS must be string.')
        .trim()
        .customSanitizer((selects) => selects.split(','))
        .customSanitizer((selects) => selects.map((select) => select.trim()))
        .isIn(customerReturnTypes.large)
        .withMessage(`SELECTS can only contain the keywords ${customerReturnTypes.large}`);

const id = () =>
    check('id')
        .isInt()
        .withMessage('ID must be number.')
        .exists()
        .withMessage("ID can't be undefined.")
        .notEmpty()
        .withMessage("ID can't be null.")
        .toInt();

const name = () =>
    check('name')
        .isString()
        .withMessage('NAME must be string.')
        .exists()
        .withMessage("NAME can't be undefined.")
        .notEmpty()
        .withMessage("NAME can't be null.")
        .bail()
        .isLength({ max: 300 })
        .withMessage("NAME can't be too large.")
        .trim();

const email = () =>
    check('email')
        .isEmail()
        .withMessage('E-MAIL must be valid.')
        .exists()
        .withMessage("E-MAIL can't be undefined.")
        .notEmpty()
        .withMessage("E-MAIL can't be null.")
        .bail()
        .isLength({ max: 300 })
        .withMessage("E-MAIL can't be too large.")
        .trim()
        .if((value, { req }) => req.method === 'POST' || req.method === 'PUT')
        .custom(async (email) => {
            try {
                const filters = { email };
                const response = await select({ filters });
                return response.length ? Promise.reject('E-MAIL already exists.') : Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        });

const GET = {
    selects,
    id,
    name,
    email,
};

const POST = {
    name,
    email,
};

const PUT = {
    id,
    name,
    email,
};

const DELETE = {
    id,
};

export const validators = { GET, POST, PUT, DELETE };

export const requireValidators = ['name', 'email'];

export default { requireValidators, validators };
