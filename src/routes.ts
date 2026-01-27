import { Router } from 'express';

import FlashcardController from './app/controllers/FlashcardController';

const router = Router();

router.get('/flahscards', FlashcardController.index);

export { router };
