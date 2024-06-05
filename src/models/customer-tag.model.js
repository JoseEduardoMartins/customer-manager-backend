export class CustomerTag {
    customer_id;
    tag_id;

    constructor(phone) {
        this.customer_id = phone.customer_id;
        this.tag_id = phone.tag_id;
    }

    getNonNullFields() {
        return {
            ...(this.customer_id !== undefined && { customer_id: this.customer_id }),
            ...(this.tag_id !== undefined && { tag_id: this.tag_id }),
        };
    }
}

export class CustomerTagResponse {
    customer_id;
    id;
    title;

    constructor(phone) {
        this.customer_id = phone.customer_id;
        this.id = phone.id;
        this.title = phone.title;
    }

    getNonNullFields() {
        return {
            ...(this.customer_id !== undefined && { customer_id: this.customer_id }),
            ...(this.id !== undefined && { id: this.id }),
            ...(this.title !== undefined && { title: this.title }),
        };
    }
}

export default { CustomerTag, CustomerTagResponse };
