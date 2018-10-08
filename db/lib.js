const Mongo = {
    count: (Model, criteria) => Model.count(criteria).exec(),
    find: (Model, { criteria, offset, limit, sort }) =>
        Model.find(criteria)
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec(),
    findById: (Model, id) => Model.findById(id).exec(),
    findOne: (Model, criteria) => Model.findOne(criteria).exec(),
    save: (Model, data) => new Model(data).save(),
    update: (Model, { criteria, data, projection }) => Model.update(criteria, data, projection).exec(),
};

module.exports = Mongo;
