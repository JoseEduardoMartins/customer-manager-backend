import { check, query } from 'express-validator';
import { select } from '../repositories/tag.repository';
import { tagReturnTypes } from '../utils/sql/tag.query';

const selects = () =>
    query('selects')
        .isString()
        .withMessage('SELECTS must be string.')
        .trim()
        .customSanitizer((selects) => selects.split(','))
        .customSanitizer((selects) => selects.map((select) => select.trim()))
        .isIn(tagReturnTypes.large)
        .withMessage(`SELECTS can only contain the keywords ${tagReturnTypes.large}`);

const id = () =>
    check('id')
        .isInt()
        .withMessage('ID must be number.')
        .exists()
        .withMessage("ID can't be undefined.")
        .notEmpty()
        .withMessage("ID can't be null.")
        .toInt();

const title = () =>
    check('title')
        .isString()
        .withMessage('TITLE must be string.')
        .exists()
        .withMessage("TITLE can't be undefined.")
        .notEmpty()
        .withMessage("TITLE can't be null.")
        .bail()
        .isLength({ max: 150 })
        .withMessage("TITLE can't be too large.")
        .trim()
        .if((value, { req }) => req.method === 'POST' || req.method === 'PUT')
        .custom(async (exactTitle) => {
            try {
                const filters = { exactTitle };
                const response = await select({ filters });
                return response.length ? Promise.reject('TITLE already exists.') : Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        });

const GET = {
    selects,
    id,
    title,
};

const POST = {
    title,
};

const PUT = {
    id,
    title,
};

const DELETE = {
    id,
};

export const validators = { GET, POST, PUT, DELETE };

export const requireValidators = ['title'];

export default { requireValidators, validators };
