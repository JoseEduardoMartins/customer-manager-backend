import { Router } from 'express';
import controller from '../controllers/tag.controller';
import { validateFields } from '../utils/http-validation-util';
import { requireValidators, validators } from '../validators/tag.validator';
const router = Router();

router.get('/tags/', validateFields([], validators), controller.find);

router.get('/tags/:id', validateFields(['id'], validators), controller.findById);

router.post('/tags/', validateFields(requireValidators, validators), controller.save);

router.put('/tags/:id', validateFields(['id'], validators), controller.update);

router.delete('/tags/:id', validateFields(['id'], validators), controller.remove);

export default router;
