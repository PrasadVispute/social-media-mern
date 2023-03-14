import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth.js';

import {
    getFeedPosts,
    getUserPosts,
    likePost
} from '../controllers/posts.js';

//read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//update
router.patch("/:id/like", verifyToken, likePost);

export default router;