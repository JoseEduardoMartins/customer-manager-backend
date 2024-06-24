import { typeValidators } from '../type-utils';

const small = ['id', 'name', 'email'];
const middle = [...small];
const large = [...middle];

export const customerReturnTypes = {
    small,
    middle,
    large,
};

export const customerSelect = {
    id: 'customer.id AS id',
    name: 'customer.name AS name',
    email: 'customer.email AS email',
};

export const customerParameters = {
    id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { id:${value} } must be a number`);
        return `id = ${value}`;
    },
    name: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { name: '${value}' } must be a string`);
        return `name LIKE '%${value}%'`;
    },
    email: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { email: ${value} } must be a string`);
        return `email = '${value}'`;
    },
};

export default { customerReturnTypes, customerSelect, customerParameters };
