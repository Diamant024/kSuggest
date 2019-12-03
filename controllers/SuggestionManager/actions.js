const mongoose = require('mongoose');

let SuggestionModel = mongoose.model('Suggestion'),
    SuggestionStatus = mongoose.model('SuggestionStatus');

function getList(options) {
    let query = SuggestionModel.find();

    this.beforeExec(query, options);

    return query.exec().then((result) => {
        this.afterExec(result, options);
        return result;
    });
}

function create(options) {

    let query = SuggestionModel.create({
        _id: new mongoose.Types.ObjectId(),
        name: options.name,
        description: options.description,
        creator: options.creatorId
    });

    this.beforeExec(query, options);

    return query.exec();
}

function edit(options) {
    let query = SuggestionModel.findOne({ _id: options.id });

    this.beforeExec(query, options);

    return query.exec().then((result) => {
        if (!result)
            throw { message: 'Object not found' };

        this.afterExec(result, options);

        return result;
    })
}

module.exports = {
    'getList': getList,
    'create': create,
    'edit': edit
};