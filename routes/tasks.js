const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

/* POST /api/tasks  */
router.post(
  '/',
  auth,
  [
    check('name', 'Name of task is mandatory').not().isEmpty(),
    check('project', 'Name of project is mandatory').not().isEmpty(),
  ],
  taskController.createTask
);

/* GET/api/tasks  */
router.get('/', auth, taskController.getTasks);

/* PUT/api/tasks/:id  */
router.put('/:id', auth, taskController.updateTask);

/* DELETE /api/tasks/:id  */
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
