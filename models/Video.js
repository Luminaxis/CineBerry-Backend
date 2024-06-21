import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    videoPath: {
        type: String,
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
