import { runQuery } from '../config/database';
import { Customer } from '../models/customer.model';
import { customerParameters, customerReturnTypes, customerSelect } from '../utils/sql/customer.query.js';
import { getQueryFilters, getQuerySelects } from '../utils/sql/queries';
import { typeValidators } from '../utils/type-utils';

export const select = async ({ selects = customerReturnTypes.middle, filters = {} }) => {
    try {
        const query = `
            SELECT ${getQuerySelects(selects, customerSelect)}
            FROM customer
            ${getQueryFilters(filters, customerParameters)}
        `;

        const response = await runQuery(query);

        const customers = response.map((customer) => new Customer(customer));
        return customers;
    } catch (error) {
        throw error;
    }
};

export const selectById = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `
            SELECT *
            FROM customer
            WHERE id = ${id}
        `;

        const response = await runQuery(query);
        if (response?.length === 0) return {};

        const customer = new Customer(response[0]);
        return customer;
    } catch (error) {
        throw error;
    }
};

export const insert = async (customer) => {
    try {
        const newCustomer = new Customer(customer);

        const query = ` INSERT INTO customer SET ?`;

        const response = await runQuery(query, newCustomer.getNonNullFields());

        return { id: response.insertId };
    } catch (error) {
        throw error;
    }
};

export const update = async (id, customer) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const newCustomer = new Customer(customer);

        const query = `
            UPDATE customer
            SET ?
            WHERE id = ${id}
        `;

        const response = await runQuery(query, newCustomer.getNonNullFields());

        return response === 0 ? null : {};
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    if (!typeValidators(id, 'number')) throw new Error('Param {id} is invalid');

    try {
        const query = `DELETE FROM customer WHERE id = ${id}`;

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
