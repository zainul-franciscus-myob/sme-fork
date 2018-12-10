import { fetch } from 'whatwg-fetch';
import AbortController from 'abortcontroller-polyfill/dist/abortcontroller';
import uuid from 'uuid/v4';

import Config from '../Config';
import RootMapping from './httpMapping/RootMapping';
import handleResponse from './httpMapping/handleResponse';

const config = {
  baseUrl: `${Config.BFF_BASE_URL}/bff`,
};

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
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

const createHttpIntegration = (getAdditionalHeaders = () => ({})) => ({
  read: async ({
    intent, urlParams, params, onSuccess, onFailure,
  }) => {
    abortRequest(intent);

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

    handleResponse(
      fetch(url, requestOptions),
      onSuccess,
      onFailure,
    );
  },
  write: async ({
    intent, urlParams, content, onSuccess, onFailure,
  }) => {
    abortRequest(intent);

    const controller = new AbortController();
    abortMapping[intent] = controller;

    const { baseUrl } = config;
    const requestSpec = RootMapping[intent];
    const additionalHeaders = await getAdditionalHeaders();
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...additionalHeaders },
      body: JSON.stringify(content),
      signal: controller.signal,
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const url = `${baseUrl}${intentUrlPath}`;

    handleResponse(
      fetch(url, requestOptions),
      onSuccess,
      onFailure,
    );
  },
});

export default createHttpIntegration;
