import PetIntents from './PetIntents'

export default class MemoryIntegration {
  constructor(data) {
    this.data = data || {};
    this.petsIntentMapping = {
      [PetIntents.LOAD_PETS_AND_SPECIES]: this.data,
      [PetIntents.ALLOCATE_SPECIES_FOR_PET]: handleAllocation
    }
  }

  read(intent) {
    return this.petsIntentMapping[intent];
  }

  write(intent, params, onSuccess, onFailure) {
    this.petsIntentMapping[intent](params, onSuccess, onFailure)
  }
}

const handleAllocation = (params, onSuccess, onFailure) => {
  if( params.pet.name === 'Smoke') {
    onFailure();
  } else {
    params.pet.species = params.species;
    onSuccess();
  }
};
