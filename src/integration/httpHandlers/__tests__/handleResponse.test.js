import errorCode from '../errorCode';
import handleResponse from '../handleResponse';

describe('handleResponse', () => {
  const responseParser = jest.fn().mockResolvedValue({});
  const onFailure = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when promise is failed', () => {
    it('should fail', async () => {
      const failedPromise = Promise.reject(Error('TEST'));

      await handleResponse({
        fetchedPromise: failedPromise,
        responseParser,
        onSuccess,
        onFailure,
      });

      expect(onFailure).toBeCalled();
    });
  });

  describe('when response HTTP status code is >= 400', () => {
    it('should fail', async () => {
      const httpErrorCodePromise = Promise.resolve({
        status: 400,
      });

      await handleResponse({
        fetchedPromise: httpErrorCodePromise,
        responseParser,
        onSuccess,
        onFailure,
      });

      expect(onFailure).toBeCalled();
    });
  });

  describe('when response HTTP status code is 403', () => {
    it('should redirect to permission denied', async () => {
      const forbiddenCodePromise = Promise.resolve({
        status: 403,
        json: () => ({}),
      });

      await handleResponse({
        fetchedPromise: forbiddenCodePromise,
        responseParser,
        onSuccess,
        onFailure,
        urlParams: { businessId: '1234-3456-123456-123456' },
      });

      expect(window.location.href).toBe(
        'http://localhost/#/au/1234-3456-123456-123456/permissionDenied'
      );
    });

    it('should redirect to linked user', async () => {
      const forbiddenCodePromise = Promise.resolve({
        status: 403,
        json: () => ({
          code: errorCode.UNLINKED_USER,
        }),
      });

      await handleResponse({
        fetchedPromise: forbiddenCodePromise,
        responseParser,
        onSuccess,
        onFailure,
        urlParams: { businessId: '1234-3456-123456-123456' },
      });

      expect(window.location.href).toContain(
        'http://localhost/#/au/1234-3456-123456-123456/linkUser'
      );
    });
  });

  describe('when response HTTP status code is 400', () => {
    it('and code is FileVersionTooLow, should redirect to file unavailable page with reason', async () => {
      const body = { code: 'FileVersionTooLow' };
      const forbiddenCodePromise = Promise.resolve({
        status: 400,
        json: () => body,
      });

      await handleResponse({
        fetchedPromise: forbiddenCodePromise,
        responseParser,
        onSuccess,
        onFailure,
        urlParams: { businessId: '1234-3456-123456-123456' },
      });

      expect(window.location.href).toBe(
        'http://localhost/#/au/1234-3456-123456-123456/unavailable?reason=versionTooLow'
      );
    });

    it('and code is FileVersionTooHigh, should redirect to file unavailable page with reason', async () => {
      const body = { code: 'FileVersionTooHigh' };
      const forbiddenCodePromise = Promise.resolve({
        status: 400,
        json: () => body,
      });

      await handleResponse({
        fetchedPromise: forbiddenCodePromise,
        responseParser,
        onSuccess,
        onFailure,
        urlParams: { businessId: '1234-3456-123456-123456' },
      });

      expect(window.location.href).toBe(
        'http://localhost/#/au/1234-3456-123456-123456/unavailable?reason=versionTooHigh'
      );
    });
  });

  describe('when fails to parse response', () => {
    it('should fail', async () => {
      const goodResponsePromise = Promise.resolve({
        status: 200,
      });

      const failingResponseParser = jest.fn().mockRejectedValue(new Error());

      await handleResponse({
        fetchedPromise: goodResponsePromise,
        responseParser: failingResponseParser,
        onSuccess,
        onFailure,
      });

      expect(onFailure).toBeCalled();
    });
  });

  describe('when a good response is received', () => {
    it('should succeed', async () => {
      const goodResponsePromise = Promise.resolve({
        status: 200,
      });

      await handleResponse({
        fetchedPromise: goodResponsePromise,
        responseParser,
        onSuccess,
        onFailure,
      });

      expect(onSuccess).toBeCalled();
    });
  });
});
