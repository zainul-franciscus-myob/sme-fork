import { getUser, isLoggedIn } from '../Auth';
import getLeanEnagageFields from './getLeanEngageFields';

/*
 * The following LeanEngage integration code has been taken from LeanEnage.
 * See https://www.leanengage.com/go#/apps/[appId]/integration (replace [appId] with actual appId value).
 */

/* eslint-disable */
const init = (window, doc, script, url, apiName, a, m) => {
  window.LeanEngageObject = apiName;
  window[apiName] = window[apiName] || function () {
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

const start = ({
  appId, businessDetails, currentUser, subscription,
}) => leanengage('start', getLeanEnagageFields({ // eslint-disable-line no-undef
  userAuth: getUser(),
  appId,
  businessDetails,
  currentUser,
  subscription,
}));

const initializeLeanEngage = (appId) => {
  init(window, document, 'script', '//www.leanengage.com/leanengage.v1.js', 'leanengage');

  const startLeanEnage = ({ businessDetails, currentUser, subscription }) => {
    if (isLoggedIn()) {
      start({
        appId, businessDetails, currentUser, subscription,
      });
    }
  };
  return startLeanEnage;
};

export default initializeLeanEngage;
