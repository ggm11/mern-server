const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project } = req.body;

    const projectDB = await Project.findById(project);
    if (!projectDB) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (projectDB.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const task = new Task(req.body);

    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error has occurred');
  }
};

exports.getTasks = async (req, res) => {
  try {
    // TODO: remove project-id from header, new URI /projects/{projectId}/tasks
    const project = req.headers['project-id'];

    const projectDB = await Project.findById(project);

    if (!projectDB) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (projectDB.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error has occurred');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const projectDB = await Project.findById(project);

    if (projectDB.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    // TODO: change let
    let newTask = {};
    if (name) {
      newTask = { name };
    }
    if (state) {
      newTask = { ...newTask, state };
    }

    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error has occurred');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const projectDB = await Project.findById(project);

    if (projectDB.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Task deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error has occurred');
  }
};
