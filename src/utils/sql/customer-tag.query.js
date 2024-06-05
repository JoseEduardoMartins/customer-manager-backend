import { typeValidators } from '../type-utils';
import { tagReturnTypes, tagSelect, tagParameters } from './tag.query';

const small = ['customer_id', 'tag_id'];
const middle = [...tagReturnTypes.small, ...small];
const large = [...tagReturnTypes.middle, ...middle];

export const customerTagReturnTypes = {
    small,
    middle,
    large,
};

export const customerTagSelect = {
    ...tagSelect,
    customer_id: 'customer_tag.customer_id AS customer_id',
    tag_id: 'customer_tag.tag_id AS tag_id',
};

export const customerTagParameters = {
    ...tagParameters,
    customer_id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { customer_id:${value} } must be a number`);
        return `customer_tag.customer_id = ${value}`;
    },
    tag_id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { tag_id:${value} } must be a number`);
        return `customer_tag.tag_id = ${value}`;
    },
};

export default { customerTagReturnTypes, customerTagSelect, customerTagParameters };
