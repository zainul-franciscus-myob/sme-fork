import fileUnavailableHandler from './errorHandlers/fileUnavailableHandler';
import permissionDeniedHandler from './errorHandlers/permissionDeniedHandler';
import unlinkedUserHandler from './errorHandlers/unlinkedUserHandler';

// default handler does nothing
const defaultHandler = {
  canHandle: () => true,
  handle: () => {},
};

const handlers = [
  // ordering is important.
  unlinkedUserHandler,
  permissionDeniedHandler,
  fileUnavailableHandler,
  defaultHandler,
];
const handleErrorResponse = ({ response, responseBody, urlParams }) => {
  const handler = handlers.find((h) => h.canHandle(response, responseBody));
  handler.handle(urlParams);
};

export default handleErrorResponse;
