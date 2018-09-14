import * as PetIntents from '../../pet/petIntents';

export default {
  [PetIntents.LOAD_PETS_AND_SPECIES]: {
    method: 'GET',
    getPath: () => '/pets/load_pets_and_species',
  },
  [PetIntents.ALLOCATE_SPECIES_FOR_PET]: {
    method: 'PUT',
    getPath: () => '/pets/allocate_species_for_pet',
  },
};
