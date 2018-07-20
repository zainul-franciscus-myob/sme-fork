import handleResponse from '../handleResponse';

describe('handleResponse', () => {

  describe('when promise is rejected', () => {

    it('should reject', (done) => {
      const rejectedPromise = Promise.reject('TEST');

      handleResponse(rejectedPromise, () => {}, done);
    });

  });

  describe('when response HTTP status code is >= 400', () => {

    it('should reject', (done) => {
      const httpErrorCodePromise = Promise.resolve({
        status: 400
      });

      handleResponse(httpErrorCodePromise, () => {}, done);
    });

  });

  describe('when response JSON cannot be parsed', () => {
    
    it('should reject', (done) => {
      const invalidJsonResponsePromise = Promise.resolve({
        json: () => Promise.reject('TEST when JSON is invalid / unparseable')
      });

      handleResponse(invalidJsonResponsePromise, () => {}, done);
    });

  })

  describe('when a good response is received', () => {
    it('should fulfill', (done) => {
      const goodResponsePromise = Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200
      });

      handleResponse(goodResponsePromise, done, () => {});
    });
  })
});
