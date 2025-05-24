import mongoose from 'mongoose'

const PostTypeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postType: {
    type: PostTypeSchema,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
    enum: ['👍', '❤️', '😮', '😂', '👎', null],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)