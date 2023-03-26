import express from 'express';
import { PostsController } from '../controllers/index';
import { syncError } from '../utilities/error'
const router = express.Router();

router.get('/', syncError(async (req, res) => {
    const result = await PostsController.get(req, res)
    res.json(result).end()
}));

router.post('/', syncError(async (req, res) => {
    const result = await PostsController.create(req, res)
    res.json(result).end()
}));

export default router;
