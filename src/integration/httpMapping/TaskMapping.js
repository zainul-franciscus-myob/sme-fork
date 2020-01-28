import {
  CLOSE_TASKS,
  GET_TASKS_LIST,
} from '../../root/rootIntents';

const listPath = ({ businessId }) => `/${businessId}/tasks`;
const closeTasksPath = ({ businessId, closeEvent }) => `/${businessId}/tasks/closeTasks/${closeEvent}`;

const TaskMapping = {
  [GET_TASKS_LIST]: { method: 'GET', getPath: listPath },
  [CLOSE_TASKS]: { method: 'POST', getPath: closeTasksPath },
};

export default TaskMapping;
