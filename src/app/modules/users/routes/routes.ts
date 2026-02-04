import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

router.get('/',UserController.index);
router.get('/:id',UserController.show);
router.get('/', UserController.showEmail);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export { router };
