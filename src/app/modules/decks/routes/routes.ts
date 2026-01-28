import { Router } from 'express';
import  DeckController  from '../controller/DeckController';

const router = Router();

router.get('/', DeckController.index);
router.get('/:id', DeckController.show);
router.post('/', DeckController.store);
router.put('/:id', DeckController.update);
router.delete('/:id', DeckController.delete);

export { router };
