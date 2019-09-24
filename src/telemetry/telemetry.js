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

const recordPageVisit = (currentRouteName, routeParams, userId, businessId) => {
  const routeRegion = routeParams.region ? `${routeParams.region}/` : '';
  const pageViewProperties = {
    name: currentRouteName,
    title: document.title,
    url: `${window.location.origin}${window.location.pathname}${routeRegion}${currentRouteName}`,
    path: `${window.location.pathname}${routeRegion}${currentRouteName}`,
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
      recordPageVisit(currentRouteName, routeParams, userId, businessId);
    }
  };
};

export default loadTelemetry;
