import { SET_DASHBOARD_TASKS } from '../DashboardIntents';

const setTasks = (state, { tasks }) => ({
  ...state,
  tasks,
});

export default {
  [SET_DASHBOARD_TASKS]: setTasks,
};
