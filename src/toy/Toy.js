import React, { Component } from 'react';
import { Table, StandardTemplate } from '@myob/myob-widgets';
import './Toy.css';
import PetRow from "./PetRow";

class Toy extends Component {
  render() {
    const { pets, species } = this.props;
    const petRows = pets.map(pet => <PetRow key={pet.name} pet={pet} allSpecies={species} onAllocate={this.props.onAllocate}/>);

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
}

export default Toy;