const { User, Thought } = require('../models');

const userController = {
    // ❄️ get all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },

    // ❄️ get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }
    );
    },

    // ❄️ create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // ❄️ update user by id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params.id
        },
        body,
        {
            new: true,
            runValidators: true
        }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
    )
    .catch(err => res.status(400).json(err));
    },

    // ❄️ delete user by id
    deleteUserById({ params }, res) {
        User.findOneAndRemove({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
        .catch(err => res.status(400).json(err));
    },

    // ❄️ add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
    )
    .catch(err => res.json(err));
    },

    // ❄️ remove friend
    removeFriend({ params }, res) {
        User.findOneAndRemove(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }

};



module.exports = userController;