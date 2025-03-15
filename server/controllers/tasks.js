import Project from "../models/Project.js";
import Task from "../models/Task.js";


// Create a task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, startDate,dueDate, assignee, project } = req.body;
    const task = new Task({
      title,
      description,
      status,
      startDate,
      dueDate,
      assignee,
      project,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

// Get all tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignee project');
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get a single task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignee project');
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Get tasks of a specific assignee
export const getTasksByAssignee = async (req, res, next) => {
  try {
    const { assigneeId } = req.params;
    console.log(assigneeId);
    const tasks = await Task.find({ assignee: assigneeId }).populate('assignee project')
    .populate('project', '_id name');
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTasksByAssigneeAndProject = async (req, res, next) => {
  try {
    const { assigneeId , projectId} = req.params;
    console.log(assigneeId);
    const tasks = await Task.find({ assignee: assigneeId, project: projectId}).populate('assignee project');
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update a task
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('assignee project');
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};
// Update a status

export const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: newStatus },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Get tasks by project id
export const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    console.log(projectId);
    const project = await Project.findById(projectId);
    console.log(project);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const tasks = await Task.find({ project: project._id }).populate('assignee project');
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const findFirstAndLastTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId }).sort({ startDate: 1 }).exec();

    const firstTask = tasks[0];
    const lastTask = tasks[tasks.length - 1];

    res.json({ firstTask, lastTask });
  } catch (err) {
    next(err);
  }
};

export const likeTask = async (req, res, next) => {
  const { liked , userId} = req.body;
  const { taskId } = req.params;

  try {
      const task = await Task.findById(taskId);
      if (!task) {
          return res.status(404).send('Task not found');
      }

      if (liked) {
          if (!task.likes.includes(userId)) {
              task.likes.push(userId);
          }
      } else {
          if (task.likes.includes(userId)) {
              task.likes.pull(userId);
          }
      }

      await task.save();
      res.status(200).send('Task updated successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
};