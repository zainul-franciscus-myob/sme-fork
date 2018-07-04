import React, { Component } from 'react';
import { Button, Combobox } from '@myob/myob-widgets';

export default class PetSpeciesAllocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllocationOptions: false
    };
  }
  
  render() {
    return this.state.showAllocationOptions ? this.renderComboBox() : this.renderButton();
  }

  renderButton() {
    const label = this.props.pet.species ? this.props.pet.species : 'Allocate me';
    return (<Button onClick={this.onShowAllocationOptions} type="link">{label}</Button>)
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
        onChange={this.onAllocate}
        hintText=""
      />
    );
  }

  onShowAllocationOptions = () => {
    this.setState({
      showAllocationOptions: true
    });
  }

  onAllocate = (species) => {
    this.setState({
      showAllocationOptions: false
    });
    this.props.onAllocate(this.props.pet, species.name);
  }
}