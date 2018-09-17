import fetch from 'cross-fetch';
import uuid from 'uuid/v4';

import bffMappings from './httpMappings/rootMappings';
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
  'x-myobapi-requestid': uuid(),
};

export default (getAdditionalHeaders = () => ({})) => {
  const config = {
    baseUrl: 'http://localhost:5000/bff',
  };
  const mappings = bffMappings;

  return {
    read: ({
      intent, urlParams, params, onSuccess, onFailure,
    }) => {
      const { baseUrl } = config;
      const requestSpec = mappings[intent];
      const requestOptions = {
        method: requestSpec.method,
        headers: { ...defaultHttpHeaders, ...getAdditionalHeaders() },
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
      const requestSpec = mappings[intent];
      const requestOptions = {
        method: requestSpec.method,
        headers: { ...defaultHttpHeaders, ...getAdditionalHeaders() },
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
  };
};
