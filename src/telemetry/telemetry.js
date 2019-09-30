import { getUser } from '../Auth';
import initilizeSegment from './initilizeSegment';

const associateUserWithGroup = (currentBusinessId, { businessId }) => {
  if (businessId && currentBusinessId !== businessId) {
    window.analytics.group(businessId);
    return businessId;
  }
  return currentBusinessId;
};

const identifyUser = (currentUserId) => {
  const user = getUser();
  if (user && currentUserId !== user.userId) {
    window.analytics.identify(user.userId);
    return user.userId;
  }
  return currentUserId;
};

const getUrl = (businessId) => {
  const url = window.location.href;
  return (businessId ? url.replace(`/${businessId}`, '') : url).replace('/#', '');
};

const getPath = (businessId) => {
  const path = window.location.hash;
  return (businessId ? path.replace(`/${businessId}`, '') : path).replace('#', '');
};

const recordPageVisit = (currentRouteName, userId, businessId) => {
  const pageViewProperties = {
    name: currentRouteName,
    title: document.title,
    url: getUrl(businessId),
    path: getPath(businessId),
    userId,
  };

  const pageViewOptions = {
    context: {
      groupId: businessId,
    },
  };

  window.analytics.page(currentRouteName, pageViewProperties, pageViewOptions);
};

const loadTelemetry = (segmentWriteKey) => {
  initilizeSegment();
  if (window.analytics && !window.analytics.initialize && segmentWriteKey) {
    window.analytics.load(segmentWriteKey);
  }

  let userId;
  let businessId;

  return ({ currentRouteName, routeParams }) => {
    if (window.analytics) {
      userId = identifyUser(userId);
      businessId = associateUserWithGroup(businessId, routeParams);
      recordPageVisit(currentRouteName, userId, businessId);
    }
  };
};

export default loadTelemetry;
