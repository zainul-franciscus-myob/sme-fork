import React from 'react';

import { ALLOCATE_SPECIES_FOR_PET, LOAD_PETS_AND_SPECIES } from './PetIntents';
import PetReducer from './PetReducer';
import PetView from './PetView';
import Store from '../store/Store';

export default class PetModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(PetReducer);
    this.setRootView = setRootView;
  }

  loadPetsAndSpecies = () => {
    this.integration.read(
      LOAD_PETS_AND_SPECIES,
      ({ pets, species }) => {
        this.store.publish({
          intent: LOAD_PETS_AND_SPECIES,
          pets,
          species,
        });
      },
      error => console.error(error),
    );
  };

  handleAllocate = (pet, species) => {
    this.integration.write(
      ALLOCATE_SPECIES_FOR_PET,
      { pet, species },
      (updatedPet) => {
        this.store.publish({
          intent: ALLOCATE_SPECIES_FOR_PET,
          updatedPet,
        });
      },
      () => console.error('Failure to allocate species'),
    );
  };

  render = (state) => {
    this.setRootView(<PetView
      pets={state.pets}
      species={state.species}
      onAllocate={this.handleAllocate}
    />);
  }

  run = () => {
    this.store.subscribe(this.render);
    this.loadPetsAndSpecies();
  }
}
