import Task from '../models/task.model.js';
import createError from '../utils/createError.js';

// Create Task
export const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        return res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
            throw createError(404, 'Task not found');
        }
        return res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal Server Error',
        });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            throw createError(404, 'Task not found');
        }

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Get Task
export const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            throw createError(404, 'Task not found');
        }
        return res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};


// Get All Tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Internal Server Error',
        });
    }
};