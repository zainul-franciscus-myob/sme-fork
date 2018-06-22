import React, { Component } from 'react';
import { Table, StandardTemplate } from '@myob/myob-widgets';
import PetSpeciesAllocator from './PetSpeciesAllocator';
import './Toy.css';

class Toy extends Component {
  render() {
    const { pets, species } = this.props;
    const petRows = pets.map(pet => this.renderPetRow(pet, species, this.props.onAllocate));

    return (
      <div className="Toy container">
        <StandardTemplate pageHead='Cat or dog?'>
          <Table>
            <Table.Header>
              <Table.HeaderItem width="30%">Pet Name</Table.HeaderItem>
              <Table.HeaderItem width="40%">Owner</Table.HeaderItem>
              <Table.HeaderItem width="30%">Allocation</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {petRows}
            </Table.Body>
          </Table>
        </StandardTemplate>
      </div>
    );
  }

  renderPetRow = (pet, allSpecies, onAllocate) => {
    const petSpeciesAllocator = (
      <PetSpeciesAllocator
        pet={pet}
        species={allSpecies}
        selectedSpecies={pet.species}
        onSpeciesAllocation={onAllocate}
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

export default Toy;