import { Router } from 'express';

import FlashcardController from './app/controllers/FlashcardController';

const router = Router();

router.get('/flashcards', FlashcardController.index);
router.get('/flashcards/:id', FlashcardController.show);
router.delete('/flashcards/:id', FlashcardController.delete);
router.post('/flashcards', FlashcardController.store);
router.put('/flashcards/:id', FlashcardController.update);

export { router };
