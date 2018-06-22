import React from 'react';
import ReactDOM from 'react-dom';
import Toy from '../toy/Toy';

export default class PetModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.domElement = domElement;
  }

  handleAllocate = () => {
    console.log('I did that thing');
    this.integration.write();
  }

  run() {
    const pets = this.integration.read('pets');
    const species = this.integration.read('species');

    ReactDOM.render(
      <Toy
        pets={pets}
        species={species}
        onAllocate={this.handleAllocate}
      />,
      this.domElement
    );
  }
}
