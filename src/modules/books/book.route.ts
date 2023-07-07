import express from 'express';
import * as bookController from './book.controller';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

export default router;
