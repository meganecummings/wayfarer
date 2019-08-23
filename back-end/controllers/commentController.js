const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    showComment: (req, res) => {
        db.Post.findById(req.params.post_id, (err, foundPost) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            const foundComment = foundPost.comments.id(req.params.comment_id);
            res.status(200).json({
                status: 200,
                data: foundPost,
                requestedAt: getTime()
            });
        });
    }, 
    createComment: (req, res) => {
        db.Post.findById(req.params.post_id, (err, foundPost) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            db.Comment.create(req.body, (err, createdComment) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: 'Something went wrong, please try again'
                });
                foundPost.comments.push(createdComment);
                foundPost.save((err, savedPost) => {
                    if (err) return res.status(400).json({
                        status: 400,
                        message: 'Something went wrong, please try again'
                    });
                    res.status(200).json({
                        status: 200,
                        data: savedPost,
                        requestedAt: getTime()
                    });
                });
            });
        });
    },
    deleteComment: (req, res) => {
        db.Post.findById(req.params.post_id, (err, foundPost) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            foundPost.comments.id(req.params.comment_id).remove(),
            foundPost.save((err, savedPost)=> {
                if (err) return res.status(400).json({
                    status: 400,
                    message: 'Something went wrong, please try again'
                });
                res.status(200).json({
                    status: 200,
                    data: savedPost,
                    requestedAt: getTime(),
                });
            });
        });
    },
    updateComment: (req, res) => {
        db.Post.findById(req.params.post_id, (err, foundPost)=> {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again'
            });
            const commentToUpdate = foundPost.comments.id(req.params.comment_id);
            commentToUpdate.title = req.body.title;
            commentToUpdate.content = req.body.content;
            foundPost.save((err, savedPost) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: 'Something went wrong, please try again'
                });
                res.status(200).json({
                    status: 200,
                    data: savedPost,
                    requestedAt: getTime()
                });
            });
        });
    }
};