import { typeValidators } from '../type-utils';
import { tagParameters } from './tag.query';

export const customerTagParameters = {
    ...tagParameters,
    customer_id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { customer_id:${value} } must be a number`);
        return `customer_tag.customer_id = ${value}`;
    },
};

export default { customerTagParameters };
