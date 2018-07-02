import React, { Component } from 'react';
import { Table } from '@myob/myob-widgets';
import PetSpeciesAllocator from './PetSpeciesAllocator';

class PetRow extends Component {

  state = {
    showAllocationOptions: false,
    pet: this.props.pet //we should not do this
  }

  onStateChange = (state, pet) => {
    this.setState({
      showAllocationOptions: state,
      pet: pet // we should not do this
    })
  }

  render() {
    let {allSpecies, onAllocate} = this.props;
    let {pet, showAllocationOptions} = this.state;

    const petSpeciesAllocator = (
      <PetSpeciesAllocator
        pet={pet}
        species={allSpecies}
        selectedSpecies={pet.species}
        onSpeciesAllocation={onAllocate}

        allocationState={showAllocationOptions}
        onStateChange={this.onStateChange}
      />
    );


    return (
      <Table.Row key={pet.name}>
        <Table.RowItem width="30%">{pet.name}</Table.RowItem>
        <Table.RowItem width="40%">{pet.owner}</Table.RowItem>
        <Table.RowItem width="30%">{petSpeciesAllocator}</Table.RowItem>
      </Table.Row>
    );
  }
}

export default PetRow;