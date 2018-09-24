import handleResponse from '../handleResponse';

const fail = () => {
  throw Error('Unexpected call');
};

describe('handleResponse', () => {
  describe('when promise is rejected', () => {
    it('should reject', (done) => {
      const rejectedPromise = Promise.reject(Error('TEST'));

      handleResponse(rejectedPromise, fail, done);
    });
  });

  describe('when response HTTP status code is >= 400', () => {
    it('should reject', (done) => {
      const httpErrorCodePromise = Promise.resolve({
        status: 400,
      });

      handleResponse(httpErrorCodePromise, fail, done);
    });
  });

  describe('when response JSON cannot be parsed', () => {
    it('should reject', (done) => {
      const invalidJsonResponsePromise = Promise.resolve({
        json: () => Promise.reject(Error('TEST when JSON is invalid / unparseable')),
      });

      handleResponse(invalidJsonResponsePromise, fail, done);
    });
  });

  describe('when a good response is received', () => {
    it('should fulfill', (done) => {
      const goodResponsePromise = Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
      });

      handleResponse(goodResponsePromise, done, fail);
    });
  });
});
