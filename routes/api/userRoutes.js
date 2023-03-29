const router = require('express').Router();

// ✅ /api/users: get all; get one by id; post new; put to update by id; delete by id; 
// ✅ /api/users/:userId/friends/:friendId: Post to add a new friend; delete to remove a friend
// BONUS: Remove a user's associated thoughts when deleted

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// ❄️ /api/users
router.route('/').get(getAllUsers).post(createUser);

// ❄️ /api/users/:id
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

// ❄️ /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;