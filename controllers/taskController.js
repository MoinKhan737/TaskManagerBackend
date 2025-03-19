const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new Error('Task not found');
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!task) throw new Error('Task not found');
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new Error('Task not found');
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
