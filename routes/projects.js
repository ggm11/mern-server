const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

/* POST /api/projects  */
router.post(
  '/',
  auth,
  [check('name', 'Name of project is mandatory').not().isEmpty()],
  projectController.createProject
);

/* GET /api/projects  */
router.get('/', auth, projectController.getProjects);

/* PUT /api/projects/{projectId}  */
router.put(
  '/:id',
  auth,
  [check('name', 'Name of project is mandatory').not().isEmpty()],
  projectController.updateProject
);

/* DELETE /api/projects/{projectId}  */
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
