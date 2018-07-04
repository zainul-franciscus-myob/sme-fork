import * as PetIntents from './PetIntents'

export default class MemoryIntegration {
  constructor(data) {
    this.data = data || {};
    this.petsIntentMapping = {
      [PetIntents.LOAD_PETS_AND_SPECIES]: handleRead,
      [PetIntents.ALLOCATE_SPECIES_FOR_PET]: handleAllocation
    }
  }

  read(intent, onSuccess, onFailure) {
    this.petsIntentMapping[intent](this.data, onSuccess, onFailure);
  }

  write(intent, params, onSuccess, onFailure) {
    this.petsIntentMapping[intent](params, onSuccess, onFailure)
  }
}

const handleRead = (data, onSuccess, onFailure) => {
  onSuccess(data);
};

const handleAllocation = (params, onSuccess, onFailure) => {
  const { pet, species } = params;
  if (pet.name === 'Smoke') {
    onFailure();
  } else {
    onSuccess({ ...pet, species });
  }
};
