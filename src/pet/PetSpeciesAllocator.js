import { Button, Combobox } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PetSpeciesAllocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllocationOptions: false,
    };
  }

  onShowAllocationOptions = () => {
    this.setState({
      showAllocationOptions: true,
    });
  }

  onAllocate = (species) => {
    const { onAllocate, pet } = this.props;
    this.setState({
      showAllocationOptions: false,
    });
    onAllocate(pet, species.name);
  }

  renderComboBox() {
    const { species } = this.props;
    const comboboxMetaData = [
      { columnName: 'emoji', columnWidth: '30px', showData: true },
      { columnName: 'name', showData: true },
    ];

    return (
      <Combobox
        items={species}
        metaData={comboboxMetaData}
        noMatchFoundMessage="No Matches Found"
        onChange={this.onAllocate}
        hintText=""
      />
    );
  }

  renderButton() {
    const { pet } = this.props;
    const label = pet.species ? pet.species : 'Allocate me';
    return (<Button onClick={this.onShowAllocationOptions} type="link">{label}</Button>);
  }

  render() {
    const { showAllocationOptions } = this.state;
    return showAllocationOptions ? this.renderComboBox() : this.renderButton();
  }
}

PetSpeciesAllocator.propTypes = {
  species: PropTypes.isRequired,
  onAllocate: PropTypes.isRequired,
  pet: PropTypes.isRequired,
};
