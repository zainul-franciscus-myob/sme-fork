import { fetch } from 'whatwg-fetch';
import AbortController from 'abortcontroller-polyfill/dist/abortcontroller';

import Config from '../Config';
import RootMapping from './httpMapping/RootMapping';
import handleResponse from './httpHandlers/handleResponse';
import uuid from '../common/uuid/uuid';

const config = {
  baseUrl: Config.BFF_BASE_URL,
};

const NO_OP = () => Promise.resolve();

const retrieveRequestSpec = (mapping, intent) => {
  const integrationFunction = mapping[intent];

  if (!integrationFunction) {
    throw Error(`Intent '${intent.toString()}' cannot be found in the http RootMapping

    Make sure:
     * you have an HttpMapping for your module
     * '${intent.toString()}' has been included in the module mapping
     * the module mapping has been included in the http RootMapping`);
  }

  return integrationFunction;
};

const encodeQuerySegment = (key, value) => {
  const encode = encodeURIComponent;
  if (Array.isArray(value)) {
    return value
      .map((segment) => `${encode(key)}=${encode(segment)}`)
      .join('&');
  }
  return `${encode(key)}=${encode(value)}`;
};

const getQueryFromParams = (params = {}) => {
  const query = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map((key) => encodeQuerySegment(key, params[key]))
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

const doFetch = (
  intent,
  urlParams,
  allowParallelRequests,
  headers,
  body,
  params
) => {
  if (!allowParallelRequests) {
    abortRequest(intent);
  }

  const controller = new AbortController();
  abortMapping[intent] = controller;

  const { baseUrl } = config;
  const requestSpec = retrieveRequestSpec(RootMapping, intent);
  const requestOptions = {
    method: requestSpec.method,
    headers,
    body,
    signal: controller.signal,
    credentials: 'include',
  };

  const intentUrlPath = requestSpec.getPath(urlParams);
  const query = getQueryFromParams(params);
  const url = `${baseUrl}${intentUrlPath}${query}`;

  return fetch(url, requestOptions);
};

const sendXHRRequest = (
  method,
  url,
  headers,
  body,
  onSuccess,
  onFailure,
  onProgress
) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType = 'json';
  if (xhr.upload && onProgress) {
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(e.loaded / e.total);
      }
    };
  }
  xhr.onload = () =>
    xhr.status >= 400 ? onFailure(xhr.response) : onSuccess(xhr.response);
  xhr.open(method, url, true);
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.send(body);
};

const writeFormData = async ({
  intent,
  urlParams,
  content,
  onSuccess,
  onFailure,
  onProgress,
  getAdditionalHeaders,
}) => {
  const additionalHeaders = await getAdditionalHeaders();

  const headers = {
    Accept: 'application/json',
    'x-myobapi-requestid': uuid(),
    ...additionalHeaders,
  };
  const body = new FormData();
  Object.keys(content).forEach((key) => body.append(key, content[key] || ''));

  const { baseUrl } = config;
  const requestSpec = retrieveRequestSpec(RootMapping, intent);
  const intentUrlPath = requestSpec.getPath(urlParams);
  const url = `${baseUrl}${intentUrlPath}`;

  sendXHRRequest(
    requestSpec.method,
    url,
    headers,
    body,
    onSuccess,
    onFailure,
    onProgress
  );
};

const createHttpIntegration = ({
  getAdditionalHeaders = NO_OP,
  getRegion,
} = {}) => ({
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
    const requestSpec = retrieveRequestSpec(RootMapping, intent);
    const additionalHeaders = await getAdditionalHeaders();
    const requestOptions = {
      method: requestSpec.method,
      headers: {
        ...getDefaultHttpHeaders(),
        ...additionalHeaders,
        region: getRegion() || '',
      },
      signal: controller.signal,
      credentials: 'include',
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const query = getQueryFromParams(params);
    const url = `${baseUrl}${intentUrlPath}${query}`;

    const fetchedPromise = fetch(url, requestOptions);
    const responseParser = (response) => response.json();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      urlParams,
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
    const requestSpec = retrieveRequestSpec(RootMapping, intent);
    const additionalHeaders = await getAdditionalHeaders();
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...additionalHeaders },
      signal: controller.signal,
      credentials: 'include',
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const query = getQueryFromParams(params);
    const url = `${baseUrl}${intentUrlPath}${query}`;

    const fetchedPromise = fetch(url, requestOptions);
    const responseParser = (response) => response.blob();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      urlParams,
    });
  },
  write: async ({
    intent,
    allowParallelRequests,
    urlParams,
    params,
    content,
    onSuccess,
    onFailure,
  }) => {
    const additionalHeaders = await getAdditionalHeaders();
    const headers = { ...getDefaultHttpHeaders(), ...additionalHeaders };
    const body = JSON.stringify(content);

    const fetchedPromise = doFetch(
      intent,
      urlParams,
      allowParallelRequests,
      headers,
      body,
      params
    );
    const responseParser = (response) => response.json();

    handleResponse({
      fetchedPromise,
      responseParser,
      onSuccess,
      onFailure,
      urlParams,
    });
  },
  writeFormData: ({
    intent,
    urlParams,
    content,
    onSuccess,
    onFailure,
    onProgress,
  }) => {
    writeFormData({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
      onProgress,
      getAdditionalHeaders,
    });
  },
  writeManyFormData: ({
    intent,
    urlParams,
    contents,
    onProgress,
    onSuccess,
    onFailure,
    onComplete,
  }) => {
    const requests = contents.map(
      (content, index) =>
        new Promise((resolve) =>
          writeFormData({
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
          })
        )
    );

    Promise.all(requests).then(onComplete);
  },
});

export default createHttpIntegration;
