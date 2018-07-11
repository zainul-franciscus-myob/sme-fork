import * as PetIntents from "../../pet/PetIntents";
import petsAndSpecies from '../data/petsAndSpecies';


const allocateSpeciesForPet = (params, onSuccess, onFailure) => {
  const { pet, species } = params;
  if (pet.name === 'Smoke') {
    onFailure();
  } else {
    onSuccess({ ...pet, species });
  }
};

const loadPetsAndSpecies = (onSuccess, onFailure) => {
  onSuccess(petsAndSpecies);
};

const intentMapping = {
  [PetIntents.LOAD_PETS_AND_SPECIES]: loadPetsAndSpecies,
  [PetIntents.ALLOCATE_SPECIES_FOR_PET]: allocateSpeciesForPet
};

export default intentMapping;
