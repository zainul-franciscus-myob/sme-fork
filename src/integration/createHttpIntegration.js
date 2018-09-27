import fetch from 'cross-fetch';
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
  return query;
};

const getDefaultHttpHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-myobapi-requestid': uuid(),
});

const createHttpIntegration = (getAdditionalHeaders = () => ({})) => ({
  read: ({
    intent, urlParams, params, onSuccess, onFailure,
  }) => {
    const { baseUrl } = config;
    const requestSpec = RootMapping[intent];
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...getAdditionalHeaders() },
    };

    const intentUrlPath = requestSpec.getPath(urlParams);
    const query = getQueryFromParams(params);
    const url = `${baseUrl}${intentUrlPath}?${query}`;

    handleResponse(
      fetch(url, requestOptions),
      onSuccess,
      onFailure,
    );
  },
  write: ({
    intent, urlParams, params, onSuccess, onFailure,
  }) => {
    const { baseUrl } = config;
    const requestSpec = RootMapping[intent];
    const requestOptions = {
      method: requestSpec.method,
      headers: { ...getDefaultHttpHeaders(), ...getAdditionalHeaders() },
      body: JSON.stringify(params),
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
