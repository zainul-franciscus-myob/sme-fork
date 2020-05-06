import errorCode from '../errorCode';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';
import isLinkUserPage from '../isLinkUserPage';


const unlinkedUserHandler = {
  canHandle: (response, responseBody) => response.status === 403
        && responseBody.code === errorCode.UNLINKED_USER,
  handle: ({ businessId }) => {
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
  },
};

export default unlinkedUserHandler;
