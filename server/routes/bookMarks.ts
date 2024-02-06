import express, { Router} from 'express'

import { createBookMark, getBookMarks } from '../controllers/bookMarks';

const router: Router = express.Router();


router.post('/:id',createBookMark)
router.get('/:id', getBookMarks)

export default router