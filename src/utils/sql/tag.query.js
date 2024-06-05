import { typeValidators } from '../type-utils';

const small = ['id', 'title'];
const middle = [...small];
const large = [...middle];

export const tagReturnTypes = {
    small,
    middle,
    large,
};

export const tagSelect = {
    id: 'tag.id AS id',
    title: 'tag.title AS title',
};

export const tagParameters = {
    id: (value) => {
        if (!typeValidators(value, 'number')) throw new Error(`Filter { id:${value} } must be a number`);
        return `id = ${value}`;
    },
    title: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { title: '${value}' } must be a string`);
        return `title LIKE '%${value}%'`;
    },
    exactTitle: (value) => {
        if (!typeValidators(value, 'string')) throw new Error(`Filter { title: '${value}' } must be a string`);
        return `title = '${value}'`;
    },
};

export default { tagReturnTypes, tagSelect, tagParameters };
