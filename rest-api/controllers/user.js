const models = require('../models');
const { User } = models;
const utils = require('../utils');

module.exports = {
    get: {
        find: async(req, res, next) => {
            const findedUser = await User.findOne({ _id: req.params.id }).populate('posts');
            const user = {
                username: findedUser.username,
                _id: findedUser._id,
                posts: findedUser.posts,
            };
            res.send(JSON.stringify(user));
        },

        check: (req, res, next) => {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
            utils.jwt.verifyToken(token)
            .then(data => {
                User.findOne({ _id: data.id }).populate('posts')
                .then(findedUser => {
                    const user = {
                        username: findedUser.username,
                        _id: findedUser._id,
                        posts: findedUser.posts,
                    };
                    
                    return res.send(JSON.stringify({
                        user,
                        status: true
                    }));
                });
            })
            .catch(() => {
                return res.send(JSON.stringify({
                    status: false
                }));
            });
        }
    },

    

    post: {
        register: async (req, res, next) => {
            const { username, password } = req.body;
            try {
                const user = await User.findOne({username}).lean();
                if (user) {
                    throw new Error('Username already exists');
                }
            } catch (error) {
                return res.status(401).send(JSON.stringify({error: error.message}));
            }
            
           User.create({ username, password })
                .then((createdUser) => {
                    const token = utils.jwt.createToken({ id: createdUser._id });
                    const user = {
                        _id: createdUser._id,
                        username: createdUser.username,
                        posts: createdUser.posts
                    }
                    res.header("Authorization", `Bearer ${token}`).send(JSON.stringify(user));
                })
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            User.findOne({ username }).populate('posts')
                .then((promise) => Promise.all([promise, promise.matchPassword(password)]))
                .then(([promise, match]) => {
                    if (!match) {
                        res.status(401).send(JSON.stringify({error: 'Invalid username or password'}));
                    }
                    const token = utils.jwt.createToken({ id: promise._id });
                    const user = {
                        _id: promise._id,
                        username: promise.username,
                        posts: promise.posts
                    }
                    res.header("Authorization", `Bearer ${token}`).send(JSON.stringify(user));
                })
                .catch(next);
        },
    },

    put: {
        update: (req, res, next) => {
            const id = req.params.id;
            const { username, password } = req.body;
            User.updateOne({ _id: id }, { username, password })
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
        }
    },

    delete: {
        deleteUser: (req, res, next) => {
            const id = req.params.id;
            User.deleteOne({ _id: id })
                .then((removedUser) => res.send(removedUser))
                .catch(next)
        }
    }
}