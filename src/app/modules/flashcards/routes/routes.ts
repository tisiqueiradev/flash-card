import { Router } from 'express';

import FlashcardController from '../controllers/FlashcardController';

const router = Router();

router.get('/', FlashcardController.index);
router.get('/:id', FlashcardController.show);
router.delete('/:id', FlashcardController.delete);
router.post('/', FlashcardController.store);
router.put('/:id', FlashcardController.update);

export { router };
