import handleResponse from '../handleResponse';

describe('handleResponse', () => {
  let fail;
  let done;
  beforeEach(() => {
    fail = jest.fn();
    done = jest.fn();
  });

  describe('when promise is rejected', () => {
    it('should reject', async () => {
      const rejectedPromise = Promise.reject(Error('TEST'));

      await handleResponse(rejectedPromise, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when response HTTP status code is >= 400', () => {
    it('should reject', async () => {
      const httpErrorCodePromise = Promise.resolve({
        status: 400,
      });

      await handleResponse(httpErrorCodePromise, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when response JSON cannot be parsed', () => {
    it('should reject', async () => {
      const invalidJsonResponsePromise = Promise.resolve({
        json: () => Promise.reject(Error('TEST when JSON is invalid / unparseable')),
      });

      await handleResponse(invalidJsonResponsePromise, done, fail);

      expect(fail).toBeCalled();
    });
  });

  describe('when a good response is received', () => {
    it('should fulfill', async () => {
      const goodResponsePromise = Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
      });

      await handleResponse(goodResponsePromise, done, fail);

      expect(done).toBeCalled();
    });
  });
});
