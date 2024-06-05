import { Router } from 'express';
const router = Router();
import { validateFields } from '../utils/http-validation-util';
import { requireValidators, validators } from '../validators/customer-tag.validator';
import controller from '../controllers/customer-tag.controller';

router.get('/customer-tags/', validateFields([], validators), controller.find);

router.post('/customer-tags/', validateFields(requireValidators, validators), controller.save);

router.put('/customer-tags/', validateFields([], validators), controller.update);

router.delete('/customer-tags/', validateFields([], validators), controller.remove);

export default router;
