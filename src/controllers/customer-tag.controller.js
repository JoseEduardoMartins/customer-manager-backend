import repository from '../repositories/customer-tag.repository';

export const find = async (req, res) => {
    try {
        const { selects, ...filters } = req.query;

        const response = await repository.select({ selects, filters });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const save = async (req, res) => {
    try {
        const { customer_id, tags } = req.body;

        for (let index = 0; index < tags.length; index++) {
            const tag_id = tags[index];

            await repository.insert({ customer_id, tag_id });
        }

        res.status(204).json({});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const update = async (req, res) => {
    try {
        const { customer_id, tags } = req.body;

        await repository.remove({ customer_id });

        for (let index = 0; index < tags.length; index++) {
            const tag_id = tags[index];

            await repository.insert({ customer_id, tag_id });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const remove = async (req, res) => {
    try {
        const filters = req.query;

        const response = await repository.remove(filters);
        if (response === null) return res.status(404).json({ message: 'Not found' });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    find,
    save,
    update,
    remove,
};
