import {
  CLOSE_TASKS,
  GET_TASKS_LIST,
} from '../../root/rootIntents';
import task from '../data/tasks/task.json';
import tasks from '../data/tasks/tasks.json';

const loadTasks = ({ onSuccess }) => onSuccess(tasks);

const TasksMapping = {
  [GET_TASKS_LIST]: loadTasks,
  [CLOSE_TASKS]: () => task,
};

export default TasksMapping;
