import {
  CLOSE_TASKS,
  GET_TASKS_LIST,
} from '../../root/rootIntents';
import closedTasks from '../data/tasks/closedTasks';
import tasks from '../data/tasks/tasks';

const loadTasks = (
  { onSuccess, urlParams: { businessId } },
) => onSuccess(tasks('au', businessId));

const TasksMapping = {
  [GET_TASKS_LIST]: loadTasks,
  [CLOSE_TASKS]: (
    { urlParams: { businessId } },
  ) => closedTasks('au', businessId),
};

export default TasksMapping;
