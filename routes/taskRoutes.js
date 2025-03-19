const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/create', createTask);
router.get('/get', getTasks);
router.get('/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;
