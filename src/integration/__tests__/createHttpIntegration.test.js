import { fetch } from 'whatwg-fetch';

import { LOAD_BILL } from '../../modules/bill/billDetail/BillIntents';
import Config from '../../Config';

jest.mock('whatwg-fetch');

describe('createDecoratedHttpIntegration', () => {
  const intent = LOAD_BILL;
  const urlParams = { businessId: 500, billId: 101 };
  const params = { businessId: 51, billId: 101 };
  const onProgress = () => { };
  const onSuccess = () => { };
  const onFailure = (error) => { throw error; };

  const setup = (response) => {
    jest.resetAllMocks();

    const mockFetch = fetch;
    mockFetch.mockReturnValue(Promise.resolve(new Response(response || '{}', {})));

    // Current implementation uses baseUrl from config, so this ensures config value can be mocked
    Config.BFF_BASE_URL = 'http://localhost:5000/12345-abcde';
    const createHttpIntegration = require('../createHttpIntegration'); // eslint-disable-line global-require

    const getRegion = () => 'testRegion';
    const integration = createHttpIntegration.default({ getRegion });

    return { integration, mockFetch };
  };

  const setupWithXhr = () => {
    const { integration } = setup();
    const oldXMLHttpRequest = window.XMLHttpRequest;
    const mockXhr = {
      open: () => { },
      close: () => { },
      withCredentials: () => { },
      responseType: () => { },
      upload: {
        onProgress: () => { },
      },
      onload: () => { },
      onDoNothing: () => { },
      send: () => { },
      setRequestHeader: () => { },
    };

    const teardown = () => {
      window.XMLHttpRequest = oldXMLHttpRequest;
    };

    return { integration, mockXhr, teardown };
  };


  describe('read', () => {
    it('creates fetch request', () => {
      const { integration, mockFetch } = setup();

      return integration.read({
        intent,
        urlParams,
        onSuccess,
        onFailure,
      }).then(() => {
        const requestOptions = mockFetch.mock.calls[0][1];
        const url = mockFetch.mock.calls[0][0];

        expect(requestOptions).toHaveProperty('credentials', 'include');
        expect(requestOptions).toHaveProperty('headers.Accept', 'application/json');
        expect(requestOptions).toHaveProperty('headers.Content-Type', 'application/json');
        expect(requestOptions).toHaveProperty('headers.region', 'testRegion');
        expect(requestOptions).toHaveProperty('headers.x-myobapi-requestid');
        expect(requestOptions).toHaveProperty('method');
        expect(requestOptions).toHaveProperty('signal');

        expect(url).toBe('http://localhost:5000/12345-abcde/500/bill/load_bill/101');
      });
    });

    it('parses fetch response', async (done) => {
      const jsonResponse = JSON.stringify({ id: 'hello' });
      const { integration } = setup(jsonResponse);
      const onSuccessCustom = (response) => {
        expect(response).toStrictEqual(JSON.parse(jsonResponse));
        done();
      };

      await integration.read({
        intent,
        urlParams,
        onSuccess: onSuccessCustom,
        onFailure,
      });
    });
  });

  describe('readFile', () => {
    it('creates fetch request', () => {
      const { integration, mockFetch } = setup();

      return integration.readFile({
        intent,
        urlParams,
        params,
        onSuccess,
        onFailure,
      }).then(() => {
        const requestOptions = mockFetch.mock.calls[0][1];
        const url = mockFetch.mock.calls[0][0];

        expect(requestOptions).toHaveProperty('credentials', 'include');
        expect(requestOptions).toHaveProperty('headers.Accept', 'application/json');
        expect(requestOptions).toHaveProperty('headers.Content-Type', 'application/json');
        expect(requestOptions).toHaveProperty('headers.x-myobapi-requestid');
        expect(requestOptions).toHaveProperty('method');
        expect(requestOptions).toHaveProperty('signal');

        expect(url).toBe('http://localhost:5000/12345-abcde/500/bill/load_bill/101?businessId=51&billId=101');
      });
    });

    it('parses fetch response', async (done) => {
      const blobResponse = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'text/plain' });
      const { integration } = setup(blobResponse);
      const onSuccessCustom = (response) => {
        expect(response).toStrictEqual(blobResponse);
        done();
      };

      await integration.readFile({
        intent,
        urlParams,
        onSuccess: onSuccessCustom,
        onFailure,
      });
    });
  });

  describe('write', () => {
    it('creates fetch request', () => {
      const { integration, mockFetch } = setup();
      const content = { name: 'macintosh' };

      return integration.write({
        intent,
        urlParams,
        params,
        content,
        onSuccess,
        onFailure,
      }).then(() => {
        const requestOptions = mockFetch.mock.calls[0][1];
        const url = mockFetch.mock.calls[0][0];

        expect(requestOptions).toHaveProperty('credentials', 'include');
        expect(requestOptions).toHaveProperty('headers.Accept', 'application/json');
        expect(requestOptions).toHaveProperty('headers.Content-Type', 'application/json');
        expect(requestOptions).toHaveProperty('headers.x-myobapi-requestid');
        expect(requestOptions).toHaveProperty('method');
        expect(requestOptions).toHaveProperty('signal');
        expect(requestOptions).toHaveProperty('body', JSON.stringify(content));

        expect(url).toBe('http://localhost:5000/12345-abcde/500/bill/load_bill/101?businessId=51&billId=101');
      });
    });

    it('parses fetch response', async (done) => {
      const jsonResponse = JSON.stringify({ message: "Success! You've successfully created a new bill.", id: '123', uid: '123e4567-e89b-12d3-a456-426655440000' });
      const { integration } = setup(jsonResponse);
      const content = { name: 'macintosh' };
      const onSuccessCustom = (response) => {
        expect(response).toStrictEqual(JSON.parse(jsonResponse));
        done();
      };

      await integration.write({
        intent,
        urlParams,
        content,
        onSuccess: onSuccessCustom,
        onFailure,
      });
    });
  });

  describe('writeFormData', () => {
    it('creates xhr request', async (done) => {
      const content = { name: 'macintosh' };
      const { integration, mockXhr, teardown } = setupWithXhr();

      mockXhr.setRequestHeader = jest.fn();
      mockXhr.open = jest.fn();
      mockXhr.send = (body) => {
        expect(mockXhr.setRequestHeader.mock.calls[0]).toEqual(['Accept', 'application/json']);
        expect(mockXhr.setRequestHeader.mock.calls[1][0]).toEqual('x-myobapi-requestid');
        expect(mockXhr.open.mock.calls[0][1]).toBe('http://localhost:5000/12345-abcde/500/bill/load_bill/101');
        expect(body.get('name')).toStrictEqual('macintosh');
        teardown();
        done();
      };
      const onFailureCustom = () => { };

      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeFormData({
        intent,
        urlParams,
        params,
        content,
        onProgress,
        onSuccess,
        onFailure: onFailureCustom,
      });
    });

    it('receives xhr response on success', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const response = { id: 5 };
      const content = {};

      mockXhr.send = function () {
        this.onload();
      };
      mockXhr.status = 200;
      mockXhr.response = response;

      const onSuccessCustom = (successResponse) => {
        expect(successResponse).toEqual(successResponse);
        teardown();
        done();
      };

      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeFormData({
        intent,
        urlParams,
        params,
        content,
        onProgress,
        onSuccess: onSuccessCustom,
        onFailure,
      });
    });

    it('receives xhr response on failure', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const content = {};

      mockXhr.send = function () { this.onload(); };
      mockXhr.status = 400;

      const onFailureCustom = jest.fn(() => {
        expect(onFailureCustom).toHaveBeenCalled();
        teardown();
        done();
      });

      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeFormData({
        intent,
        urlParams,
        params,
        content,
        onProgress,
        onSuccess,
        onFailure: onFailureCustom,
      });
    });
  });

  describe('writeManyFormData', () => {
    it('calls onComplete after receiving all responses ', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const contents = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ];

      mockXhr.status = 200;
      mockXhr.send = function () {
        this.onload();
      };

      const onCompleteCustom = jest.fn(() => {
        expect(onCompleteCustom).toHaveBeenCalled();
        teardown();
        done();
      });

      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeManyFormData({
        intent,
        urlParams,
        params,
        contents,
        onProgress,
        onSuccess,
        onFailure,
        onComplete: onCompleteCustom,
      });
    });

    it('makes multiple xhr requests', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const contents = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ];

      mockXhr.send = jest.fn(() => {
        mockXhr.onload();
      });
      mockXhr.setRequestHeader = jest.fn();
      mockXhr.open = jest.fn();
      mockXhr.status = 200;

      const onCompleteCustom = () => {
        expect(mockXhr.setRequestHeader.mock.calls[0]).toEqual(['Accept', 'application/json']);
        expect(mockXhr.setRequestHeader.mock.calls[1][0]).toEqual('x-myobapi-requestid');
        expect(mockXhr.setRequestHeader.mock.calls[2]).toEqual(['Accept', 'application/json']);
        expect(mockXhr.setRequestHeader.mock.calls[3][0]).toEqual('x-myobapi-requestid');
        expect(mockXhr.setRequestHeader.mock.calls[4]).toEqual(['Accept', 'application/json']);
        expect(mockXhr.setRequestHeader.mock.calls[5][0]).toEqual('x-myobapi-requestid');

        expect(mockXhr.open.mock.calls[0][1]).toBe('http://localhost:5000/12345-abcde/500/bill/load_bill/101');

        expect(mockXhr.send.mock.calls[0][0].get('id')).toEqual('1');
        expect(mockXhr.send.mock.calls[1][0].get('id')).toEqual('2');
        expect(mockXhr.send.mock.calls[2][0].get('id')).toEqual('3');

        teardown();
        done();
      };

      const onFailureCustom = () => { };

      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeManyFormData({
        intent,
        urlParams,
        contents,
        onProgress,
        onSuccess,
        onFailure: onFailureCustom,
        onComplete: onCompleteCustom,
      });
    });


    it('calls onSuccess for each content', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const contents = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ];

      let numberOfCalls = 0;
      mockXhr.status = 200;
      mockXhr.send = function () {
        mockXhr.response = contents[numberOfCalls];
        this.onload();
        numberOfCalls += 1;
      };

      const onSuccessCustom = jest.fn();
      const onCompleteCustom = () => {
        expect(onSuccessCustom.mock.calls[0][0]).toEqual({ id: '1' });
        expect(onSuccessCustom.mock.calls[1][0]).toEqual({ id: '2' });
        expect(onSuccessCustom.mock.calls[2][0]).toEqual({ id: '3' });
        teardown();
        done();
      };

      window.XMLHttpRequest = jest.fn(() => mockXhr);


      await integration.writeManyFormData({
        intent,
        urlParams,
        params,
        contents,
        onProgress,
        onSuccess: onSuccessCustom,
        onFailure,
        onComplete: onCompleteCustom,
      });
    });

    it('calls onFailure for each content', async (done) => {
      const { integration, mockXhr, teardown } = setupWithXhr();
      const contents = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ];
      mockXhr.send = function () {
        this.onload();
      };
      mockXhr.status = 400;

      const onFailureCustom = jest.fn();
      const onCompleteCustom = () => {
        expect(onFailureCustom).toHaveBeenCalledTimes(3);
        teardown();
        done();
      };


      window.XMLHttpRequest = jest.fn(() => mockXhr);

      await integration.writeManyFormData({
        intent,
        urlParams,
        params,
        contents,
        onProgress,
        onSuccess,
        onFailure: onFailureCustom,
        onComplete: onCompleteCustom,
      });
    });
  });
});
