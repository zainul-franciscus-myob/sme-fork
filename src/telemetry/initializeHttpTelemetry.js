import { getUser } from '../Auth';
import { parsePath, parseUrl } from './parseUrlAndPath';

const associateUserWithGroup = (currentBusinessId, { businessId }) => {
  if (businessId && currentBusinessId !== businessId) {
    window.analytics.group(businessId);
    return businessId;
  }
  return currentBusinessId;
};

const getCookie = (cname) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieMap = decodedCookie.split(';').reduce((cmap, value) => {
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
  const parsedUrl = parseUrl(url, businessId);
  return removeAccessToken(parsedUrl);
};

const getPath = (businessId) => {
  const path = window.location.hash;
  const parsedPath = parsePath(path, businessId);
  return removeAccessToken(parsedPath);
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

const initializeHttpTelemetry = () => {
  let userId;
  let businessId;

  return ({ currentRouteName, previousRouteName, routeParams }) => {
    if (window.analytics) {
      userId = identifyUser(userId, businessId, routeParams);
      businessId = associateUserWithGroup(businessId, routeParams);
      recordPageVisit(currentRouteName, userId, businessId);
    }
    if (window.newrelic) {
      window.newrelic.setCustomAttribute('currentRouteName', currentRouteName);
      window.newrelic.setCustomAttribute(
        'previousRouteName',
        previousRouteName
      );
      window.newrelic.setCustomAttribute(
        'buildNumber',
        process.env.REACT_APP_BUILD_NUMBER || 'dev'
      );
    }
  };
};

export default initializeHttpTelemetry;
