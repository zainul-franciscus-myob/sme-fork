import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';
import PetReducer from './PetReducer';
import Store from '../store/Store';
import { LOAD_PETS_AND_SPECIES, ALLOCATE_SPECIES_FOR_PET } from '../integration/PetIntents';

export default class PetModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.store = new Store(PetReducer);
    this.domElement = domElement;
  }

  loadPetsAndSpecies = () => {
    this.integration.read(
      LOAD_PETS_AND_SPECIES,
      ({ pets, species }) => {
        this.store.publish({
          intent: LOAD_PETS_AND_SPECIES,
          pets,
          species
        });
      },
      (error) => {
        console.log(`Error: ${error}`)
      }
    );
  };

  handleAllocate = (pet, species) => {
    this.integration.write(
      ALLOCATE_SPECIES_FOR_PET,
      { pet, species },
      (updatedPet) => {
        this.store.publish({
          intent: ALLOCATE_SPECIES_FOR_PET,
          updatedPet
        })
      },
      () => console.log("Failure")
    );
  };

  render = (state) => {
    ReactDOM.render(<Pet
      pets={state.pets}
      species={state.species}
      onAllocate={this.handleAllocate}
    />, this.domElement);
  }

  run() {
    ReactDOM.render(<p>Loading...</p>, this.domElement);
    this.store.subscribe(this.render);
    this.loadPetsAndSpecies();
  }
}
