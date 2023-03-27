import { Request, Response } from 'express';
import { Post } from '../models/index';
interface createData {
  name: string;
  content: string;
}
export const PostsController = {
  get: async () => {
    const result = await Post.find()
    return result
  },
  create: async (body:createData) => {
    const result = await Post.create(body)
    return result
  }
}

