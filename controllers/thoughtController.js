const { User, Thought } = require("../models");

const thoughtController = {
  // ❄️ get all thoughts 🧪✅
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ❄️ get one thought by id 🧪✅
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ❄️ create thought 🧪✅
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ update thought by id 🧪✅
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ delete thought by id 🧪✅
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json({
          message: `Successfully deleted thought of '${dbThoughtData.thoughtText}' with id: ${req.params.id}`,
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ add reaction 🧪✅
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // ❄️ remove reaction  🧪✅
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json({
        message: `Successfully deleted reaction of '${dbThoughtData.thoughtText}' with its id: '${req.params.reactionId}'`,
        parentObject: dbThoughtData,
        reactions: dbThoughtData.reactions
      }))
      .catch((err) => res.json(err)); 
  },
};

module.exports = thoughtController;
