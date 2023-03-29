// ✅ username: String; Unique; Required; Trimmed
// ✅ email: String; Required; Unique; Must match a valid email address(look into Mongoose's matching validation)
// ✅ thoughts: Array of _id values referencing the Thought model
// ✅ friends: Array of _id values referencing the User model (self-reference)
// ✅ Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // ❄️ Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// ❄️ get total count of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

// ❄️ create the User model using the UserSchema
const User = model("User", UserSchema);

module.exports = User;
