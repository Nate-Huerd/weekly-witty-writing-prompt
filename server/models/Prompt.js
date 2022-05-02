const { Schema, model } = require('mongoose');

const promptSchema = new Schema(
    {
        promptText: {
            type: String,
            required: true,
            unique: true
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

const Prompt = model("Prompt", promptSchema);

module.exports = promptSchema;
