import {
  CLOSE_ACTIVITY,
  CLOSE_TASK,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_LIST,
  GET_ACTIVITY,
  UPDATE_ACTIVITY,
} from '../../root/rootIntents';

const listPath = ({ businessId }) => `/${businessId}/activities`;
const detailPath = ({ businessId, activityId }) => `/${businessId}/activities/${activityId}`;
const closeActivityPath = ({ businessId, activityId }) => `/${businessId}/activities/${activityId}/close`;
const closeTaskPath = ({ businessId, activityId, activityKey }) => `/${businessId}/activities/${activityId}/${activityKey}/close`;

const ActivityMapping = {
  [GET_ACTIVITIES_LIST]: { method: 'GET', getPath: listPath },
  [CREATE_ACTIVITY]: { method: 'POST', getPath: listPath },
  [GET_ACTIVITY]: { method: 'GET', getPath: detailPath },
  [UPDATE_ACTIVITY]: { method: 'PATCH', getPath: detailPath },
  [DELETE_ACTIVITY]: { method: 'DELETE', getPath: detailPath },
  [CLOSE_ACTIVITY]: { method: 'POST', getPath: closeActivityPath },
  [CLOSE_TASK]: { method: 'POST', getPath: closeTaskPath },
};

export default ActivityMapping;
