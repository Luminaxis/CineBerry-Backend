import asyncHandler from 'express-async-handler';
import Video from '../models/Video.js';

// @desc    Upload a video
// @route   POST /api/videos
// @access  Private
const uploadVideo = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const videoPath = `/uploads/videos/${req.file.filename}`;

    const video = new Video({
        user: req.user._id,
        title,
        videoPath,
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
});

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find().populate('user', 'username avatar');
    res.json(videos);
});

// @desc    Get videos by user
// @route   GET /api/videos/user/:userId
// @access  Public
const getVideosByUser = asyncHandler(async (req, res) => {
    const videos = await Video.find({ user: req.params.userId }).populate('user', 'username avatar');
    res.json(videos);
});

// @desc    Like a video
// @route   PUT /api/videos/:id/like
// @access  Private
const likeVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);
  
    if (video) {
      if (video.likes.includes(req.user._id)) {
        video.likes = video.likes.filter(
          (like) => like.toString() !== req.user._id.toString()
        );
      } else {
        video.likes.push(req.user._id);
      }
      await video.save();
      res.json({ likes: video.likes.length });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  });
  

export { uploadVideo, getAllVideos, getVideosByUser, likeVideo };
