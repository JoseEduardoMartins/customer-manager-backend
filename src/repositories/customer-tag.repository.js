import { CustomerTag, CustomerTagResponse } from '../models/customer-tag.model.js';
import { runQuery } from '../config/database.js';
import { typeValidators } from '../utils/type-utils.js';
import { getQueryFilters } from '../utils/sql/queries.js';
import { customerTagParameters } from '../utils/sql/customer-tag.query.js';

export const select = async ({ filters = {} }) => {
    try {
        const query = `
            SELECT tag.*
            FROM customer_tag
            LEFT JOIN tag on customer_tag.tag_id = tag.id
            ${getQueryFilters(filters, customerTagParameters)}
        `;

        const response = await runQuery(query);

        const customerTag = response.map((customer_tag) => new CustomerTagResponse(customer_tag));
        return customerTag;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const insert = async (customer_tag) => {
    try {
        const newCustomer = new CustomerTag(customer_tag);

        const query = ` INSERT INTO customer_tag SET ?`;

        const response = await runQuery(query, newCustomer.getNonNullFields());

        return { id: response.insertId };
    } catch (error) {
        throw error;
    }
};

export const update = async (id, customer_tag) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const newCustomer = new CustomerTag(customer_tag);

        const query = `
            UPDATE customer_tag
            SET ?
            WHERE id = ${id}
        `;

        const response = await runQuery(query, newCustomer.getNonNullFields());

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export const remove = async (filters) => {
    const { customer_id } = customerTagParameters;

    try {
        const query = `
            DELETE FROM customer_tag
            ${getQueryFilters(filters, { customer_id })}
        `;

        const response = await runQuery(query);

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export default {
    select,
    insert,
    update,
    remove,
};
