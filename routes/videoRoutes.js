import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  uploadVideo,
  getAllVideos,
  getVideosByUser,
  likeVideo,
} from '../controllers/videoController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('video'), uploadVideo);
router.get('/', getAllVideos);
router.get('/user/:userId', getVideosByUser);
router.put('/:id/like', protect, likeVideo);

export default router;
