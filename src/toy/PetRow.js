import React, { Component } from 'react';
import { Table } from '@myob/myob-widgets';
import PetSpeciesAllocator from './PetSpeciesAllocator';

class PetRow extends Component {

  state = {
    showAllocationOptions: false,
  }

  onStateChange = (state) => {
    this.setState({
      showAllocationOptions: state
    })
  }

  render() {
    let {pet, allSpecies, onAllocate} = this.props;

    const petSpeciesAllocator = (
      <PetSpeciesAllocator
        pet={pet}
        species={allSpecies}
        selectedSpecies={pet.species}
        onSpeciesAllocation={onAllocate}

        allocationState={this.state.showAllocationOptions}
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