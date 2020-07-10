import { CLOSE_TASKS, GET_TASKS_LIST } from '../../root/rootIntents';

const closeTasksPath = ({ businessId, closeEvent }) =>
  `/${businessId}/tasks/update_with_event/${closeEvent}`;

const TaskMapping = {
  [GET_TASKS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/tasks/load_tasks`,
  },
  [CLOSE_TASKS]: { method: 'POST', getPath: closeTasksPath },
};

export default TaskMapping;
