import { typeValidators } from '../type-utils';

export const tagParameters = {
    id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { id:${value} } must be a number`);
        return `id = ${value}`;
    },
    title: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { title: '${value}' } must be a string`);
        return `title LIKE '%${value}%'`;
    },
};

export default { tagParameters };
