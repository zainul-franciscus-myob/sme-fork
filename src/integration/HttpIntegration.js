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

export default () => {
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

      const intentUrlPath = requestSpec.path;
      const query = getQueryFromParams(params);
      const url = `${baseUrl}${intentUrlPath}?${query}`;

      const requestOptions = {
        method: requestSpec.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

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

      const intentUrlPath = requestSpec.path;
      const url = `${baseUrl}${intentUrlPath}`;

      const requestOptions = {
        method: requestSpec.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(params),
      };

      handleResponse(
        fetch(url, requestOptions),
        onSuccess,
        onFailure,
      );
    },
  };
};
