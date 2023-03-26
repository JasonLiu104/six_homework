import {model,Schema} from 'mongoose';
import {Post} from '../interfaces/model/postInterface'
const POST_SCHEMA = new Schema<Post>(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫']
    },
    imageUrl: {
      type: String,
      default: ""
    },
    likes: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  }
);

const Post = model("Post", POST_SCHEMA);

export default Post;