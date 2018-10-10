class Lib {
    constructor(model) {
        // mongoose model
        this.model = model;
    }

    count(criteria) {
        return this.model.count(criteria).exec();
    }
    find({ criteria, offset, limit, sort }) {
        return this.model
            .find(criteria)
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec();
    }

    findById(id) {
        return this.model.findById(id).exec();
    }
    findOne(criteria) {
        return this.model.findOne(criteria).exec();
    }
    save(data) {
        return new this.model(data).save();
    }
    update({ criteria, data, projection }) {
        return this.model.update(criteria, data, projection).exec();
    }
}

export default Lib;
