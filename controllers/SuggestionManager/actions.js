const mongoose = require('mongoose');

let SuggestionModel = mongoose.model('Suggestion'),
    SuggestionStatus = mongoose.model('SuggestionStatus');

/**
 * List of Suggestions
 * @param options: { userId: String }
 * @returns {Promise<Array>}
 */
function getList(options) {
    let query = SuggestionModel.find();

    this.beforeExec(query, options);

    return query.exec().then((result) => {
        this.afterExec(result, options);
        return result;
    });
}

/**
 * Create new Suggestion
 * @param options: { name: String, description: String, creatorId: String }
 * @returns {Promise<Object>}
 */
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

/**
 * Edit exist Suggestion
 * @param options: { id: String, }
 * @returns {Promise<Object>}
 */
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
    getList,
    create,
    edit
};