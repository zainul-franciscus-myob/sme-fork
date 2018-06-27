import React, { Component } from 'react';
import { Button, Combobox } from '@myob/myob-widgets';

export default class PetSpeciesAllocator extends Component {

  render() {
    return this.props.allocationState ? this.renderComboBox() : this.renderButton();
  }

  renderButton() {
    const label = this.props.pet.species ? this.props.pet.species : 'Allocate me';
    return (<Button onClick={this.allocate} type="link">{label}</Button>)
  }

  allocate = () => {
    this.props.onStateChange(true);
  }

  renderComboBox() {
    const comboboxMetaData = [
      { columnName: 'emoji', columnWidth: '30px', showData: true },
      { columnName: 'name', showData: true },
    ];
    
    return (
      <Combobox
        items={this.props.species}
        metaData={comboboxMetaData}
        noMatchFoundMessage="No Matches Found"
        onChange={this.onSpeciesAllocation}
        hintText=""
      />
    );
  }

  onSpeciesAllocation = (value) => {
    this.props.onSpeciesAllocation(this.props.pet, value.name);
    this.props.onStateChange(false);
  }
}