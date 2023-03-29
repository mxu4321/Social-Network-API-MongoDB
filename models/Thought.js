// ✅ thoughtText: String; Required; Must be between 1 and 280 characters
// ✅ createdAt: Date; Set default value to the current timestamp; Use a getter method to format the timestamp on query
// ✅ username: String; Required
// ✅ reactions: Array of nested documents created with the reactionSchema
// ✅ Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query

const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");

const formatter = (timestamp) => {
    return timestamp.toLocaleString();
  };

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatter,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// ❄️ get total count of reactions on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// ❄️ create the Thought model using the ThoughtSchema
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
