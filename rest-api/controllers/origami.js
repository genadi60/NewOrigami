const models = require('../models');
const {Origami, User} = models;

module.exports = {
    get:{
        getAll: (req, res, next) => {
            Origami.find().populate("author").lean()
            .then((origamies) => {
                const posts = origamies.map((post) => {
                    return {
                        description: post.description,
                        _id: post._id,
                        author: post.author ? post.author.username : null,
                    }
                })
                res.send(JSON.stringify(posts))
            })
            .catch(next);
        }
    }, 

    post:{
        create: (req, res, next) => {
            const { description, author } = req.body;
            const origami = {
                description,
                author,
            }
            Origami.create(origami)
            .then((createdOrigami) => {
                User.updateOne({ _id: author }, { $push: { posts: createdOrigami._id } })
                .then(() => {
                    User.findOne({ _id: author }).populate('posts')
                    .then((promise) => {
                        const user = {
                            username: promise.username,
                            _id: promise._id,
                            posts: promise.posts,
                        }
                        res.send(JSON.stringify(user));
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        }
    }, 

    put:{
        update: (req, res, next) => {
            const id = req.params.id;
            const { description } = req.body;
            Origami.updateOne({ _id: id }, { description })
                .then((updatedOrigami) => res.send(updatedOrigami))
                .catch(next)
        }
    }, 

    delete:{
        deleteOrigami: (req, res, next) => {
            const id = req.params.id;
            Origami.deleteOne({ _id: id })
                .then((removedOrigami) => res.send(removedOrigami))
                .catch(next)
        }
    }, 
};