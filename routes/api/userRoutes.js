// ✅ /api/users: get all; get one by id; post new; put to update by id; delete by id; 
// ✅ /api/users/:userId/friends/:friendId: Post to add a new friend; delete to remove a friend


const router = require('express').Router();

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

// ❄️ /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// ❄️ /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;