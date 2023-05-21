import express from 'express';
import * as bookController from './book.controller';

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/new-release', bookController.getNewReleaseBooks);

export default router;
