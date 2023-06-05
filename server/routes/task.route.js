import { Router } from 'express';
import { 
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
} from '../controllers/task.controller.js';

const router = Router();

router.post('/', createTask);
router.get('/:id', getTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;