// ✅ reactionId: Use Mongoose's ObjectId data type; Default value is set to a new ObjectId
// ✅ reactionBody: String; Required; 280 character maximum
// ✅ username: String; Required
// ✅ createdAt: Date; Set default value to the current timestamp; Use a getter method to format the timestamp on query
// ✅ Schema Settings: This will not be a model, but rather will be used as the reaction field's sub-document schema in the Thought model.

const { Schema, model, Types } = require("mongoose");

const formatter = (timestamp) => {
    return timestamp.toLocaleString();
  };

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatter,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;