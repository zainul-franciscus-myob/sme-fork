import { StandardTemplate, Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './PetView.css';
import PetSpeciesAllocator from './PetSpeciesAllocator';

class PetView extends Component {
  renderRow = (pet) => {
    const { species, onAllocate } = this.props;
    const petSpeciesAllocator = (
      <PetSpeciesAllocator
        pet={pet}
        species={species}
        onAllocate={onAllocate}
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

  render() {
    const { pets } = this.props;
    const petRows = pets.map(pet => this.renderRow(pet));

    return (
      <div className="Pet container">
        <StandardTemplate pageHead="Cat or dog?">
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
}

PetView.propTypes = {
  species: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAllocate: PropTypes.func.isRequired,
  pets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PetView;
