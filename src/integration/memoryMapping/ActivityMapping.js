import {
  CLOSE_ACTIVITY,
  CLOSE_TASKS,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_LIST,
  GET_ACTIVITY,
  UPDATE_ACTIVITY,
} from '../../root/rootIntents';
import activities from '../data/activities/activities.json';
import activity from '../data/activities/activity.json';
import closedActivity from '../data/activities/closedActivity.json';

const loadActivities = ({ onSuccess }) => onSuccess(activities);

const ActivityMapping = {
  [CLOSE_ACTIVITY]: () => closedActivity,
  [GET_ACTIVITIES_LIST]: loadActivities,
  [CREATE_ACTIVITY]: () => activity,
  [GET_ACTIVITY]: () => activity,
  [UPDATE_ACTIVITY]: () => activity,
  [DELETE_ACTIVITY]: () => 'Activity f0c98d9a-f898-438c-86e8-ecbd06a0d11f deleted',
  [CLOSE_TASKS]: () => activity,
};

export default ActivityMapping;
