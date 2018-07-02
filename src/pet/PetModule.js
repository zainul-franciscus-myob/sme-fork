import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';
import PetIntents from "../integration/PetIntents";

export default class PetModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.domElement = domElement;
  }

  handleLoadPetsAndSpecies = (onSuccess, onFailure) => {
    this.integration.read(
      PetIntents.LOAD_PETS_AND_SPECIES,
      onSuccess,
      onFailure
    );
  };

  handleAllocate = (pet, species, setState) => {
    this.integration.write(
      PetIntents.ALLOCATE_SPECIES_FOR_PET,
      {pet, species},
      (returnedPet) => {
        setState(false, returnedPet);
        console.log("Success", returnedPet);
      },
      () => console.log("Failure")
    );
  };

  render(component) {
    ReactDOM.render(component, this.domElement);
  }

  run() {
    this.render(() => <p>Loading...</p>);

    this.handleLoadPetsAndSpecies(
      (data) => {
        this.render(
          <Pet
            pets={data.pets}
            species={data.species}
            onAllocate={this.handleAllocate}
          />
        );
      },
      (error) => {
        this.render(() => <p>Error: {error}</p>);
      }
    );
  }
}
