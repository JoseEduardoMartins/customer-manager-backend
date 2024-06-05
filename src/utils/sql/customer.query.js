import { typeValidators } from '../type-utils';

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

export default { customerParameters };
