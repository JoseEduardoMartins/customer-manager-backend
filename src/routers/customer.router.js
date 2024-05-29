import { Router } from 'express';
const router = Router();
import controller from '../controllers/customer.controller';

router.get('/customers/', controller.find);

router.get('/customers/:id', controller.findById);

router.post('/customers/', controller.save);

router.put('/customers/:id', controller.update);

router.delete('/customers/:id', controller.remove);

export default router;
