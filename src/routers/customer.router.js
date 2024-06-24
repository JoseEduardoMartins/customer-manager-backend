import { Router } from 'express';
const router = Router();
import { validateFields } from '../utils/http-validation-util';
import { requireValidators, validators } from '../validators/customer.validator';
import controller from '../controllers/customer.controller';

router.get('/customers/', validateFields([], validators), controller.find);

router.get('/customers/:id', validateFields(['id'], validators), controller.findById);

router.post('/customers/', validateFields(requireValidators, validators), controller.save);

router.put('/customers/:id', validateFields(['id'], validators), controller.update);

router.delete('/customers/:id', validateFields(['id'], validators), controller.remove);

export default router;
