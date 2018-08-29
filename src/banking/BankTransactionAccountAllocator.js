import { Combobox } from '@myob/myob-widgets';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BankTransactionAccountAllocator extends Component {
  state = {
    isComboboxVisible: false,
  };

  comboboxMetaData = [
    { columnName: 'accountNumber', columnWidth: '63px' },
    { columnName: 'accountName', columnWidth: '243px', showData: true },
    { columnName: 'subType', columnWidth: '76px' },
  ];

  constructor(props) {
    super(props);

    this.combobox = React.createRef();
  }

  openAllocationCombobox = (event) => {
    event.preventDefault(); // makes onBlur occurs after mouse click and not before
    this.setState({
      isComboboxVisible: true,
    }, () => {
      const comboboxNode = ReactDOM.findDOMNode(this.combobox.current); //eslint-disable-line
      const comboboxInputNode = comboboxNode.querySelector('input');
      comboboxInputNode.focus();
      comboboxInputNode.select();
    });
  };

  closeAllocationCombobox = (event) => {
    const comboboxNode = ReactDOM.findDOMNode(this.combobox.current); //eslint-disable-line
    const isFocusOnCombobox = comboboxNode.contains(event.relatedTarget);

    if (!isFocusOnCombobox) {
      this.setState({
        isComboboxVisible: false,
      });
    }
  };

  onAllocate = (selectedAccount) => {
    const { onAllocate } = this.props;
    this.setState({
      isComboboxVisible: false,
    });

    onAllocate(selectedAccount);
  }

  render() {
    const { accounts, allocatedAccountDisplayName, allocatedAccountId } = this.props;
    const { isComboboxVisible } = this.state;

    const enableFocus = { tabIndex: 0, role: 'button' };

    const allocatedAccount = accounts.find(account => account.id === allocatedAccountId);

    let content;

    if (isComboboxVisible) {
      content = (
        <Combobox
          ref={this.combobox}
          metaData={this.comboboxMetaData}
          onChange={account => this.onAllocate(account)}
          onSelect={(item) => {
            console.log('onSelect', item);
          }}
          noMatchFoundMessage=""
          items={accounts}
          defaultItem={allocatedAccount}
        />
      );
    } else if (allocatedAccountDisplayName) {
      content = <span {...enableFocus}>{allocatedAccountDisplayName}</span>;
    } else {
      content = <a {...enableFocus}>Allocate Me</a>;
    }

    return (
      <div
        onFocus={this.openAllocationCombobox}
        onMouseDown={this.openAllocationCombobox}
        onBlur={this.closeAllocationCombobox}
        role="button"
        tabIndex={0}
      >
        {content}
      </div>
    );
  }
}


export default BankTransactionAccountAllocator;
