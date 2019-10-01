import handleResponse from '../handleResponse';

describe('handleResponse', () => {
  const responseParser = jest.fn().mockResolvedValue({});
  const onFailure = jest.fn();
  const onSuccess = jest.fn();
  const onForbidden = jest.fn();

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
    it('should trigger forbidden response', async () => {
      const forbiddenCodePromise = Promise.resolve({
        status: 403,
        json: () => { },
      });

      await handleResponse({
        fetchedPromise: forbiddenCodePromise,
        responseParser,
        onSuccess,
        onFailure,
        onForbidden,
      });

      expect(onForbidden).toBeCalled();
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
