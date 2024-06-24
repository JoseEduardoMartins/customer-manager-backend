import repository from '../repositories/customer.repository.js';
import repositoryCustomerTag from '../repositories/customer-tag.repository.js';
import repositoryTag from '../repositories/tag.repository.js';

export const find = async (req, res) => {
    try {
        const { selects, ...filters } = req.query;

        const response = await repository.select({ selects, filters });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const findById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const customer = await repository.selectById(id);

        const tags = await repositoryCustomerTag.select({
            filters: {
                customer_id: id,
            },
        });

        res.status(200).json({
            ...customer,
            ...(tags && { tags }),
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const save = async (req, res) => {
    try {
        const { tags, ...customer } = req.body;

        const { id } = await repository.insert(customer);

        for (let i = 0; i < tags.length; i++) {
            const { title } = tags[i];

            const [tag] = await repositoryTag.select({
                filters: {
                    title,
                },
            });

            if (tag)
                repositoryCustomerTag.insert({
                    customer_id: id,
                    tag_id: tag.id,
                });
            else {
                const responseTag = await repositoryTag.insert({ title });
                repositoryCustomerTag.insert({
                    customer_id: id,
                    tag_id: responseTag.id,
                });
            }
        }

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { tags, ...customer } = req.body;

        if (Object.keys(customer).length) {
            const responseCustomer = await repository.update(id, customer);
            if (responseCustomer === null) return res.status(404).json({ message: 'Not found' });
        }

        const responseCustomerTag = repositoryCustomerTag.remove({ customer_id: id });
        if (responseCustomerTag === null) return res.status(404).json({ message: 'Not found' });

        for (let i = 0; i < tags.length; i++) {
            const { title } = tags[i];

            const [tag] = await repositoryTag.select({
                filters: {
                    title,
                },
            });

            if (tag)
                repositoryCustomerTag.insert({
                    customer_id: id,
                    tag_id: tag.id,
                });
            else {
                const responseTag = await repositoryTag.insert({ title });
                repositoryCustomerTag.insert({
                    customer_id: id,
                    tag_id: responseTag.id,
                });
            }
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const responseCustomerTag = repositoryCustomerTag.remove({ customer_id: id });
        if (responseCustomerTag === null) return res.status(404).json({ message: 'Not found' });

        const response = await repository.remove(id);
        if (response === null) return res.status(404).json({ message: 'Not found' });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    find,
    findById,
    save,
    update,
    remove,
};
