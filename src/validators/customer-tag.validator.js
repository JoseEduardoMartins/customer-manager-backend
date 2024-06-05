import { check, query, body } from 'express-validator';
import { selectById as selectByCustomer } from '../repositories/customer.repository';
import { select as selectByCustomerTags } from '../repositories/customer-tag.repository';
import { selectById as selectByTag } from '../repositories/tag.repository';
import { customerTagReturnTypes } from '../utils/sql/customer-tag.query';
import { validators as validatorsTag } from './tag.validator';
const { GET: GETValidatorsFeature } = validatorsTag;

const selects = () =>
    query('selects')
        .isString()
        .withMessage('SELECTS must be string.')
        .trim()
        .customSanitizer((selects) => selects.split(','))
        .customSanitizer((selects) => selects.map((select) => select.trim()))
        .isIn(customerTagReturnTypes.large)
        .withMessage(`SELECTS can only contain the keywords ${customerTagReturnTypes.large}`);

const customer_id = () =>
    check('customer_id')
        .isInt()
        .withMessage('CUSTOMER ID must be number.')
        .exists()
        .withMessage("CUSTOMER ID can't be undefined.")
        .notEmpty()
        .withMessage("CUSTOMER ID can't be null.")
        .bail()
        .toInt()
        .if((value, { req }) => req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')
        .custom(async (id) => {
            try {
                const response = await selectByCustomer(id);

                return !Object.keys(response).length
                    ? Promise.reject('CUSTOMER ID doesn´t exists.')
                    : Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        });

const tags = () =>
    body('tags')
        .isArray({ min: 1 })
        .withMessage('TAGS must be array')
        .exists()
        .withMessage("TAGS can't be undefined")
        .notEmpty()
        .withMessage("TAGS can't be null")
        .bail()
        .toArray()
        .custom(async (values, { req }) => tag_id('tags.*').run(req));

const tag_id = (field) =>
    check(field)
        .isInt()
        .withMessage('TAGS ID must be number.')
        .exists()
        .withMessage("TAGS ID can't be undefined.")
        .notEmpty()
        .withMessage("TAGS ID can't be null.")
        .bail()
        .toInt()
        .if((value, { req }) => req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')
        .custom(async (tag_id, { req }) => {
            try {
                if (req.method === 'POST') {
                    const params = {
                        selects: ['id'],
                        filters: { tag_id, customer_id: req.body.customer_id },
                    };

                    const response = await selectByCustomerTags(params);

                    return Object.keys(response).length
                        ? Promise.reject('CUSTOMER TAGS already exists.')
                        : Promise.resolve();
                } else if (req.method === 'PUT' || req.method === 'DELETE') {
                    const response = await selectByTag(tag_id);

                    return !Object.keys(response).length
                        ? Promise.reject('CUSTOMER ID doesn´t exists.')
                        : Promise.resolve();
                }
            } catch (error) {
                return Promise.reject(error);
            }
        });

const GET = {
    ...GETValidatorsFeature,
    selects,
    customer_id,
    tag_id: () => tag_id('tag_id'),
};

const POST = {
    customer_id,
    tags,
};

const PUT = {
    customer_id,
    tags,
};

const DELETE = {
    customer_id,
    tag_id: () => tag_id('tag_id'),
};

export const validators = { GET, POST, PUT, DELETE };

export const requireValidators = ['customer_id', 'tags'];

export default { validators, requireValidators };
