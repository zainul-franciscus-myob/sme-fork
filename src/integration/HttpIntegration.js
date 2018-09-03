import fetch from 'cross-fetch';

import bffMappings from './httpMappings/bffMappings';
import handleResponse from './httpMappings/handleResponse';

function getQueryFromParams(params = {}) {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return query;
}

const defaultHttpHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default (getAdditionalHeaders = () => ({})) => {
  const config = {
    baseUrl: 'http://localhost:5000/bff',
  };
  const mappings = bffMappings;

  return {
    read: ({
      intent, params, onSuccess, onFailure,
    }) => {
      const { baseUrl } = config;
      const requestSpec = mappings[intent];
      const requestOptions = {
        method: requestSpec.method,
        headers: { ...defaultHttpHeaders, ...getAdditionalHeaders() },
      };

      const intentUrlPath = requestSpec.path;
      const query = getQueryFromParams(params);
      const url = `${baseUrl}${intentUrlPath}?${query}`;

      handleResponse(
        fetch(url, requestOptions),
        onSuccess,
        onFailure,
      );
    },

    write: ({
      intent, params, onSuccess, onFailure,
    }) => {
      const { baseUrl } = config;
      const requestSpec = mappings[intent];
      const requestOptions = {
        method: requestSpec.method,
        headers: { ...defaultHttpHeaders, ...getAdditionalHeaders() },
        body: JSON.stringify(params),
      };

      const intentUrlPath = requestSpec.path;
      const url = `${baseUrl}${intentUrlPath}`;

      handleResponse(
        fetch(url, requestOptions),
        onSuccess,
        onFailure,
      );
    },
  };
};
