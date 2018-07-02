import PetIntents from './PetIntents'

export default class MemoryIntegration {
  constructor(data) {
    this.data = data || {};
    this.petsIntentMapping = {
      [PetIntents.LOAD_PETS_AND_SPECIES]: handleRead,
      [PetIntents.ALLOCATE_SPECIES_FOR_PET]: handleAllocation
    }
  }

  read(intent, onSuccess, onFailure) {
    return this.petsIntentMapping[intent](this.data, onSuccess, onFailure);
  }

  write(intent, params, onSuccess, onFailure) {
    this.petsIntentMapping[intent](params, onSuccess, onFailure)
  }
}

const handleRead = (data, onSuccess, onFailure) => {
  onSuccess(data);
};

const handleAllocation = (params, onSuccess, onFailure) => {
  if( params.pet.name === 'Smoke') {
    onFailure();
  } else {
    params.pet.species = params.species;
    onSuccess(params.pet);
  }
};
