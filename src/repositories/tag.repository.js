import { Tag } from '../models/tag.model';
import { runQuery } from '../config/database';
import { typeValidators } from '../utils/type-utils';
import { getQuerySelects, getQueryFilters } from '../utils/sql/queries';
import { tagReturnTypes, tagSelect, tagParameters } from '../utils/sql/tag.query';

export const select = async ({ selects = tagReturnTypes.middle, filters = {} }) => {
    try {
        const query = `
            SELECT ${getQuerySelects(selects, tagSelect)}
            FROM tag
            ${getQueryFilters(filters, tagParameters)}
        `;

        const response = await runQuery(query);

        const tags = response.map((tag) => new Tag(tag));
        return tags;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const selectById = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `
            SELECT *
            FROM tag
            WHERE id = ${id}
        `;

        const response = await runQuery(query);
        if (response?.length === 0) return {};

        const tag = new Tag(response[0]);
        return tag;
    } catch (error) {
        throw error;
    }
};

export const insert = async (tag) => {
    try {
        const newTag = new Tag(tag);

        const query = ` INSERT INTO tag SET ?`;

        const response = await runQuery(query, newTag.getNonNullFields());

        return { id: response.insertId };
    } catch (error) {
        throw error;
    }
};

export const update = async (id, tag) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const newTag = new Tag(tag);

        const query = `
            UPDATE tag
            SET ?
            WHERE id = ${id}
        `;

        const response = await runQuery(query, newTag.getNonNullFields());

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `DELETE FROM tag WHERE id = ${id}`;

        const response = await runQuery(query);

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export default {
    select,
    selectById,
    insert,
    update,
    remove,
};
