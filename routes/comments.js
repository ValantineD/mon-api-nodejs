const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");
const authService = require("../middlewares/authService");

router.post("/new/post/:postId", authService.verifyToken, async (req, res) => {
    const {postId} = req.params;

    try {
        const comment = Comment(req.body);
        await comment.validate();

        comment._postId = postId;
        comment._userId = req.userId;

        await comment.save();

        return res.status(201).json({
            success: true,
            message: "comment created successfully",
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            const validations = Object.values(err.errors).map(e => ({
                message: e.message,
                field: e.path, // correspond au champ Mongoose (email, name, etc.)
            }));

            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Validation error",
                    validations: validations,
                },
            });
        }

    }
});

module.exports = router;