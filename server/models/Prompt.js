const { Schema, model } = require('mongoose');

const promptSchema = new Schema(
    {
        promptText: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }
    },
    {
        toJson: {
            getters: true
        }
    }
);

module.exports = promptSchema;