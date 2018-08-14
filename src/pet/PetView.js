import React, { Component } from 'react';
import { Table, StandardTemplate } from '@myob/myob-widgets';
import './PetView.css';
import PetSpeciesAllocator from './PetSpeciesAllocator';

class PetView extends Component {

  render() {
    const petRows = this.props.pets.map((pet) => this.renderRow(pet));

    return (
      <div className="Pet container">
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

  renderRow = (pet) => {
    const petSpeciesAllocator = (
      <PetSpeciesAllocator
        pet={pet}
        species={this.props.species}
        onAllocate={this.props.onAllocate}
      />
    );

    return (<Table.Row key={pet.name}>
      <Table.RowItem width="30%">{pet.name}</Table.RowItem>
      <Table.RowItem width="40%">{pet.owner}</Table.RowItem>
      <Table.RowItem width="30%">{petSpeciesAllocator}</Table.RowItem>
    </Table.Row>)
  }
}

export default PetView;
