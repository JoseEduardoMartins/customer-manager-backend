import { Router } from 'express';
const router = Router();
import controller from '../controllers/tag.controller';

router.get('/tags/', controller.find);

router.get('/tags/:id', controller.findById);

router.post('/tags/', controller.save);

router.put('/tags/:id', controller.update);

router.delete('/tags/:id', controller.remove);

export default router;
