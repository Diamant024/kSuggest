const mongoose = require('mongoose');

let SuggestionModel = mongoose.model('Suggestion'),
    SuggestionStatus = mongoose.model('SuggestionStatus');

/**
 * List of Suggestions
 * @param options: { userId: String }
 * @returns {Promise<Array>}
 */
async function getList(options) {
    let query = SuggestionModel.find();

    this.beforeExec(options, query);

    let result = await query.exec();

    this.afterExec(options, result);

    return result;
}

/**
 * Create new Suggestion
 * @param options: { name: String, description: String, creatorId: String }
 * @returns {Promise<Object>}
 */
async function create(options) {

    this.beforeExec(options);

    let result = await SuggestionModel.create({
        _id: new mongoose.Types.ObjectId(),
        name: options.name,
        description: options.description,
        creator: options.creatorId
    });

    this.afterExec(options, result);

    return result;
}

/**
 * Edit exist Suggestion
 * @param options: { id: String, name: String }
 * @returns {Promise<Object>}
 */
async function edit(options) {

    let searchDef = { _id: options.id },
        updateDef = {
            name: options.name,
            status: options.status,
            highPriority: options.highPriority,
            description: options.description
        };

    let query = SuggestionModel.updateOne(searchDef, updateDef);

    this.beforeExec(options, query);

    let result = await query.exec();

    if (!result.nModified)
        throw { message: 'Object not found' };

    this.afterExec(options, result);

    return result;
}

module.exports = {
    getList,
    create,
    edit
};