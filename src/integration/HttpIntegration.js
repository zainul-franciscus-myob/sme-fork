import fetch from 'cross-fetch';
import bffMappings from './httpMappings/bffMappings';

export default class HttpIntegration {
  constructor() {
    this.config = {
      baseUrl: "http://localhost:5000/bff"
    }
    this.mappings = bffMappings;
  }

  read(intent, onSuccess, onFailure) {
    const { baseUrl } = this.config;
    const requestSpec = this.mappings[intent];
    fetch(`${baseUrl}${requestSpec.path}`, {
      method: requestSpec.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.status >= 400) {
          onFailure(res);
        }
        return res.json();
      })
      .then(data => {
        onSuccess(data);
      })
      .catch(err => {
        console.error(err);
        onFailure(err);
      });
  }

  write(intent, params, onSuccess, onFailure) {
    const { baseUrl } = this.config;
    const requestSpec = this.mappings[intent];
    fetch(`${baseUrl}${requestSpec.path}`, {
      method: requestSpec.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(res => {
        if (res.status >= 400) {
          onFailure(res);
        }
        return res.json();
      })
      .then(data => {
        onSuccess(data);
      })
      .catch(err => {
        console.error(err);
        onFailure(err);
      });
  }
}
