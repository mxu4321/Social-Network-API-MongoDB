const router = require('express').Router();

// ✅ /api/thoughts: get all; get one by id; post new; put to update by id; delete by id;
// ✅ /api/thoughts/:thoughtId/reactions: post to add a reaction stored in a single reactions array field; delete to pull and remove a reaction by the reaction's reactionId value

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// ❄️ /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// ⏰: push the created thought's _id to the associated user's thoughts array field

// ❄️ /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

// ❄️ /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// ❄️ /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;