import { fetch } from 'whatwg-fetch';
import AbortController from 'abortcontroller-polyfill/dist/abortcontroller';
import uuid from 'uuid/v4';

import Config from '../Config';
import RootMapping from './httpMapping/RootMapping';
import handleForbiddenResponse from './httpHandlers/handleForbiddenResponse';
import handleResponse from './httpHandlers/handleResponse';

const config = {
  baseUrl: Config.BFF_BASE_URL,
};

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return query && `?${query}`;
};

const getDefaultHttpHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-myobapi-requestid': uuid(),
});

const abortMapping = {};

const abortRequest = (intent) => {
  const controller = abortMapping[intent];
  if (controller) {
    controller.abort();
  }
};

const doFetch = (intent, urlParams, allowParallelRequests, headers, body) => {
  if (!allowParallelRequests) {
    abortRequest(intent);
  }

  const controller = new AbortController();
  abortMapping[intent] = controller;

  const { baseUrl } = config;
  const requestSpec = RootMapping[intent];
  const requestOptions = {
    method: requestSpec.method,
    headers,
    body,
    signal: controller.signal,
  };

  const intentUrlPath = requestSpec.getPath(urlParams);
  const url = `${baseUrl}${intentUrlPath}`;

  return fetch(url, requestOptions);
};

const sendXHRRequest = (method, url, headers, body, onSuccess, onFailure, onProgress) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  if (xhr.upload && onProgress) {
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(e.loaded / e.total);
      }
    };
  }
  xhr.onload = () => (xhr.status >= 400 ? onFailure(xhr.response) : onSuccess(xhr.response));
  xhr.open(method, url, true);
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.send(body);
};

const writeFormData = async ({
  intent, urlParams, content, onSuccess, onFailure, onProgress, getAdditionalHeaders,
}) => {
  const additionalHeaders = await getAdditionalHeaders();

  const headers = {
    Accept: 'application/json',
    'x-myobapi-requestid': uuid(),
    ...additionalHeaders,
  };
  const body = new FormData();
  Object.keys(content).forEach(key => body.append(key, content[key] || ''));

  const { baseUrl } = config;
  const requestSpec = RootMapping[intent];
  const intentUrlPath = requestSpec.getPath(urlParams);
  const url = `${baseUrl}${intentUrlPath}`;

  sendXHRRequest(requestSpec.method, url, headers, body, onSuccess, onFailure, onProgress);
};

const createHttpIntegration = (getAdditionalHeaders = () => ({})) => ({
  read: async ({
    intent,
    urlParams,
    allowParallelRequests = false,
    params,
    onSuccess,
    onFailure,
  }) => {
    if (!allowParallelRequests) {
      abortRequest(intent);
    }

    const controller = new AbortController();
    abortMapping[intent] = controller;

    const { baseUrl } = config;
    const requestSpec = RootMapping[intent];
    const additionalHeaders = await getAdditionalHeaders();
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...additionalHeaders },
      signal: controller.signal,
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const query = getQueryFromParams(params);
    const url = `${baseUrl}${intentUrlPath}${query}`;

    const fetchedPromise = fetch(url, requestOptions);
    const responseParser = async response => response.json();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      onForbidden: handleForbiddenResponse(urlParams),
    });
  },
  readFile: async ({
    intent,
    urlParams,
    allowParallelRequests = false,
    params,
    onSuccess,
    onFailure,
  }) => {
    if (!allowParallelRequests) {
      abortRequest(intent);
    }

    const controller = new AbortController();
    abortMapping[intent] = controller;

    const { baseUrl } = config;
    const requestSpec = RootMapping[intent];
    const additionalHeaders = await getAdditionalHeaders();
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...additionalHeaders },
      signal: controller.signal,
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const query = getQueryFromParams(params);
    const url = `${baseUrl}${intentUrlPath}${query}`;

    const fetchedPromise = fetch(url, requestOptions);
    const responseParser = async response => response.blob();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      onForbidden: handleForbiddenResponse(urlParams),
    });
  },
  write: async ({
    intent,
    allowParallelRequests,
    urlParams,
    content,
    onSuccess,
    onFailure,
  }) => {
    const additionalHeaders = await getAdditionalHeaders();
    const headers = { ...getDefaultHttpHeaders(), ...additionalHeaders };
    const body = JSON.stringify(content);

    const fetchedPromise = doFetch(intent, urlParams, allowParallelRequests, headers, body);
    const responseParser = async response => response.json();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      onForbidden: handleForbiddenResponse(urlParams),
    });
  },
  writeFormData: async ({
    intent,
    urlParams,
    content,
    onSuccess,
    onFailure,
    onProgress,
  }) => {
    writeFormData({
      intent, urlParams, content, onSuccess, onFailure, onProgress, getAdditionalHeaders,
    });
  },
  writeManyFormData: async ({
    intent,
    urlParams,
    contents,
    onProgress,
    onSuccess,
    onFailure,
    onComplete,
  }) => {
    const requests = contents.map((content, index) => new Promise(resolve => writeFormData({
      intent,
      urlParams,
      content,
      allowParallelRequests: true,
      onProgress,
      onSuccess: (response) => {
        onSuccess(response, index);
        resolve({ success: true, response });
      },
      onFailure: (response) => {
        onFailure(response, index);
        resolve({ success: false, response });
      },
      getAdditionalHeaders,
    })));

    Promise.all(requests).then(onComplete);
  },
});

export default createHttpIntegration;
