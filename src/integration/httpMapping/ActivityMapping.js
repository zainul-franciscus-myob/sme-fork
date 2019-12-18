import {
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_LIST,
  GET_ACTIVITY,
  UPDATE_ACTIVITY,
} from '../../drawer/activities/ActivitiesIntents';

const listPath = ({ businessId, userId }) => `/${businessId}/users/${userId}/activities`;
const detailPath = ({ businessId, userId, activityId }) => `/${businessId}/users/${userId}/activities/${activityId}`;

const ActivityMapping = {
  [GET_ACTIVITIES_LIST]: { method: 'GET', getPath: listPath },
  [CREATE_ACTIVITY]: { method: 'POST', getPath: listPath },
  [GET_ACTIVITY]: { method: 'GET', getPath: detailPath },
  [UPDATE_ACTIVITY]: { method: 'PATCH', getPath: detailPath },
  [DELETE_ACTIVITY]: { method: 'DELETE', getPath: detailPath },
};

export default ActivityMapping;
