import errorCode from '../errorCode';

const fileUnavailableHandler = {
  canHandle: (response, { code }) =>
    response.status === 400 &&
    (code === errorCode.FILE_UNAVAILABLE_VERSION_TOO_LOW ||
      code === errorCode.FILE_UNAVAILABLE_VERSION_TOO_HIGH),
  handle: ({ businessId }, { code }) => {
    const reason =
      code === errorCode.FILE_UNAVAILABLE_VERSION_TOO_LOW
        ? 'versionTooLow'
        : 'versionTooHigh';
    window.location.href = `/#/au/${businessId}/unavailable?reason=${reason}`;
  },
};

export default fileUnavailableHandler;
