import React from 'react';
import ReactDOM from 'react-dom';
import Toy from './Toy';
import PetIntents from "../integration/PetIntents";

export default class PetModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.domElement = domElement;
  }

  handleAllocate = (pet, species) => {
    this.integration.write(
      PetIntents.ALLOCATE_SPECIES_FOR_PET,
      {pet, species},
      () => {
        console.log("Success");
      },
      () => console.log("Failure")
    );
  };

  run() {
    this.data = this.integration.read(PetIntents.LOAD_PETS_AND_SPECIES);
    ReactDOM.render(
      <Toy
        pets={this.data.pets}
        species={this.data.species}
        onAllocate={this.handleAllocate}
      />,
      this.domElement
    );
  } 
}
