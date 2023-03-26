import { Request, Response } from 'express';
import { Post } from '../models/index';
export const PostsController = {
  get: async (req: Request, res: Response) => {
    const result = await Post.find()
    return result
  },
  create: async (req: Request, res: Response) => {
    const { body } = req
    const result = await Post.create(body)
    return result
  }
}

