export class Tag {
    id;
    title;

    constructor(phone) {
        this.id = phone.id;
        this.title = phone.title;
    }

    getNonNullFields() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            ...(this.title !== undefined && { title: this.title }),
        };
    }
}

export default { Tag };
