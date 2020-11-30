import { getUser, isLoggedIn } from '../Auth';
import Config from '../Config';
import getLeanEnagageFields from './getLeanEngageFields';

/*
 * The following LeanEngage integration code has been taken from LeanEnage.
 * See https://www.leanengage.com/go#/apps/[appId]/integration (replace [appId] with actual appId value).
 */

/* eslint-disable */
const init = (window, doc, script, url, apiName, a, m) => {
  window.LeanEngageObject = apiName;
  window[apiName] =
    window[apiName] ||
    function () {
      (window[apiName].q = window[apiName].q || []).push(arguments);
    };
  window[apiName].l = 1 * new Date();
  a = doc.createElement(script);
  m = doc.getElementsByTagName(script)[0];
  a.async = 1;
  a.src = url;
  m.parentNode.insertBefore(a, m);
};
/* eslint-enable */

const start = ({ appId, businessDetails, currentUser, subscription }) =>
  // eslint-disable-next-line no-undef
  leanengage(
    'start',
    getLeanEnagageFields({
      userAuth: getUser(),
      appId,
      businessDetails,
      currentUser,
      subscription,
    })
  );

const isUserInfoAvailable = ({ businessDetails, currentUser, subscription }) =>
  Object.keys(businessDetails).length > 0 &&
  Object.keys(currentUser).length > 0 &&
  Object.keys(subscription).length > 0;

const initializeLeanEngage = (getLeanEngageInfo) => {
  init(
    window,
    document,
    'script',
    '//www.leanengage.com/leanengage.v1.js',
    'leanengage'
  );

  const startLeanEngage = () => {
    const leanEngageInfo = getLeanEngageInfo();
    if (isLoggedIn() && isUserInfoAvailable(leanEngageInfo)) {
      start({
        appId: Config.LEAN_ENGAGE_APP_ID,
        ...leanEngageInfo,
      });
    }
  };
  return { startLeanEngage };
};

export default initializeLeanEngage;
