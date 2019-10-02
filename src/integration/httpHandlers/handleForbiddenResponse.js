import getForbiddenHandler from './getForbiddenHandler';
import isLinkUserPage from './isLinkUserPage';

const errorCode = {
  UNLINKED_USER: 'UnlinkedUser',
};

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return query && `?${query}`;
};

const handleUnlinkedUser = ({ businessId }) => {
  const currentUrl = window.location.href;

  // We restrict redirections if we're already on the link user page as otherwise
  // when the user successfully links a user to their mydot account, they'll be redirected
  // back to the link user page.
  if (!isLinkUserPage(currentUrl)) {
    // In the Navigation Module, as part of loading business information, even if the
    // region is hardcoded to 'au' (such as below), if the business information dictates
    // that the user is within 'nz', then we will replace the URL params to instead use
    // 'nz'.
    const queryParams = getQueryFromParams({ redirectURL: currentUrl });
    window.location.href = `/#/au/${businessId}/linkUser${queryParams}`;
  }
};

const handleDefault = ({ businessId }) => {
  window.location.href = `/#/au/${businessId}/permissionDenied`;
};

const handleMap = ({
  [errorCode.UNLINKED_USER]: handleUnlinkedUser,
});

const handleForbiddenResponse = urlParams => (responseBody) => {
  const handler = getForbiddenHandler({
    responseBody,
    handleMap,
    handleDefault,
  });

  handler(urlParams);
};

export default handleForbiddenResponse;
