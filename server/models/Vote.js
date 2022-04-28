const { Schema, model } = require("mongoose");

const voteSchema = new Schema(
{
    
}
);

const Vote = model("Vote", voteSchema);

module.exports = Vote;