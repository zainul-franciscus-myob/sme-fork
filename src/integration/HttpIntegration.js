import fetch from 'cross-fetch';

import bffMappings from './httpMappings/bffMappings';
import handleResponse from './httpMappings/handleResponse';

export default () => {
  const config = {
    baseUrl: 'http://localhost:5000/bff',
  };
  const mappings = bffMappings;

  return {
    read: (intent, onSuccess, onFailure) => {
      const { baseUrl } = config;
      const requestSpec = mappings[intent];
      const requestUrl = `${baseUrl}${requestSpec.path}`;
      const requestOptions = {
        method: requestSpec.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      handleResponse(
        fetch(requestUrl, requestOptions),
        onSuccess,
        onFailure,
      );
    },

    write: (intent, params, onSuccess, onFailure) => {
      const { baseUrl } = config;
      const requestSpec = mappings[intent];
      const requestUrl = `${baseUrl}${requestSpec.path}`;
      const requestOptions = {
        method: requestSpec.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(params),
      };

      handleResponse(
        fetch(requestUrl, requestOptions),
        onSuccess,
        onFailure,
      );
    },
  };
};
