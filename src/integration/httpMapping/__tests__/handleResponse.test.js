import handleResponse from '../handleResponse';

describe('handleResponse', () => {
  const responseParser = jest.fn().mockResolvedValue({});
  const fail = jest.fn();
  const done = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when promise is failed', () => {
    it('should fail', async () => {
      const failedPromise = Promise.reject(Error('TEST'));

      await handleResponse(failedPromise, responseParser, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when response HTTP status code is >= 400', () => {
    it('should fail', async () => {
      const httpErrorCodePromise = Promise.resolve({
        status: 400,
      });

      await handleResponse(httpErrorCodePromise, responseParser, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when fails to parse response', () => {
    it('should fail', async () => {
      const goodResponsePromise = Promise.resolve({
        status: 200,
      });

      const failingResponseParser = jest.fn().mockRejectedValue(new Error());

      await handleResponse(goodResponsePromise, failingResponseParser, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when a good response is received', () => {
    it('should succeed', async () => {
      const goodResponsePromise = Promise.resolve({
        status: 200,
      });

      await handleResponse(goodResponsePromise, responseParser, done, fail);

      expect(done).toBeCalled();
    });
  });
});
