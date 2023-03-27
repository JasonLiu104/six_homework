import express from 'express';
import { PostsController } from '../controllers/index';
import { syncError } from '../utilities/error'
const router = express.Router();

router.get('/', syncError(async (req, res) => {
    const result = await PostsController.get()
    res.json(result)
}));

router.post('/', syncError(async (req, res) => {
    const {body} = req
    const result = await PostsController.create(body)
    res.json(result)
}));

export default router;
