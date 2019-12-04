import { getUser } from '../Auth';
import initilizeSegment from './initializeSegment';

const associateUserWithGroup = (currentBusinessId, { businessId }) => {
  if (businessId && currentBusinessId !== businessId) {
    window.analytics.group(businessId);
    return businessId;
  }
  return currentBusinessId;
};

const getCookie = (cname) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieMap = decodedCookie
    .split(';')
    .reduce((cmap, value) => {
      const [key, val] = value.trim().split('=');
      // eslint-disable-next-line no-param-reassign
      cmap[key] = val;
      return cmap;
    }, {});
  return cookieMap[cname];
};

const getGoogleAnalyticsClientId = () => {
  try {
    const ga = getCookie('_ga');
    return ga && ga.split('.').slice(-2).join('.');
  } catch {
    return undefined;
  }
};

const identifyUser = (currentUserId, currentBusinessId, { businessId }) => {
  const user = getUser();
  if (user) {
    const userChanged = currentUserId !== user.userId;
    const businessChanged = currentBusinessId !== businessId;
    if (userChanged || businessChanged) {
      window.analytics.identify(user.userId, { businessId });
      return user.userId;
    }
  }
  return currentUserId;
};

const removeAccessToken = (path) => {
  const index = path.indexOf('access_token');
  if (index === -1) {
    return path;
  }
  return path.substr(0, index);
};

const getUrl = (businessId) => {
  const url = window.location.href;
  const urlWithoutBusinessId = businessId ? url.replace(`/${businessId}`, '') : url;
  const urlWithoutHash = urlWithoutBusinessId.replace('/#', '');
  return removeAccessToken(urlWithoutHash);
};

const getPath = (businessId) => {
  const path = window.location.hash;
  const pathWithoutBusinessId = businessId ? path.replace(`/${businessId}`, '') : path;
  const pathWithoutHash = pathWithoutBusinessId.replace('#', '');
  return removeAccessToken(pathWithoutHash);
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

  const googleAnalyticsClientId = getGoogleAnalyticsClientId();
  if (googleAnalyticsClientId) {
    pageViewOptions.context['Google Analytics'] = {
      clientId: googleAnalyticsClientId,
    };
  }

  window.analytics.page(currentRouteName, pageViewProperties, pageViewOptions);
};

const initializeHttpTelemetry = (segmentWriteKey) => {
  initilizeSegment();
  if (window.analytics && !window.analytics.initialize && segmentWriteKey) {
    window.analytics.load(segmentWriteKey);
  }

  let userId;
  let businessId;

  return ({ currentRouteName, routeParams }) => {
    if (window.analytics) {
      userId = identifyUser(userId, businessId, routeParams);
      businessId = associateUserWithGroup(businessId, routeParams);
      recordPageVisit(currentRouteName, userId, businessId);
    }
  };
};

export default initializeHttpTelemetry;
