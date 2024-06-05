export class Customer {
    id;
    name;
    email;

    constructor(phone) {
        this.id = phone.id;
        this.name = phone.name;
        this.email = phone.email;
    }

    getNonNullFields() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            ...(this.name !== undefined && { name: this.name }),
            ...(this.email !== undefined && { email: this.email }),
        };
    }
}

export default { Customer };
