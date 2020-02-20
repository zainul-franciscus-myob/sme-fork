import errorCode from '../errorCode';

const fileUnavailableHandler = {
  canHandle: (response, { code }) => response.status === 400
   && code === errorCode.FILE_UNAVAILABLE,
  handle: ({ businessId }) => {
    window.location.href = `/#/au/${businessId}/unavailable`;
  },
};

export default fileUnavailableHandler;
