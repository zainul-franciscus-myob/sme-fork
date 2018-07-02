import PetIntents from './PetIntents';
import fetch from 'cross-fetch';

export default class HttpIntegration {
  constructor(env) {
    // lets get this from the environment
    this.baseUrl = "http://localhost:5000/bff";
    this.intentsBffMapping = {
      [PetIntents.LOAD_PETS_AND_SPECIES]: {method: 'GET', path: `${this.baseUrl}/pets/load_pets_and_species`},
      [PetIntents.ALLOCATE_SPECIES_FOR_PET]: {method: 'PUT', path: `${this.baseUrl}/pets/allocate_species_for_pet`}
    }
  }

  read(intent, onSuccess, onFailure) {
    const requestSpec = this.intentsBffMapping[intent];
    fetch(requestSpec.path,  {
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
    const requestSpec = this.intentsBffMapping[intent]
    fetch(requestSpec.path,  {
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
