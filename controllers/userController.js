const { User, Thought } = require("../models");

const userController = {
  // ❄️ get all users 🧪✅
  getAllUsers(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  },

  // ❄️ get one user by id 🧪✅
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ❄️ create user 🧪✅
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ update user by id 🧪✅
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ delete user by id 🧪✅
  deleteUserById({ params }, res) {
    User.findOneAndRemove({ _id: params.userId })
      .then(async (dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        // ✅ BONUS: Remove a user's associated thoughts when deleted
        await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        // $in: like for..in method
        res.json({
          message: `User ${dbUserData.username} has been deleted!`,
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ add friend 🧪✅
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // ❄️ remove friend 🧪✅
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
