import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Combobox} from '@myob/myob-widgets';

class BankTransactionAccountAllocator extends Component {
  state = {
    isDisplayingCombobox: false,
  };

  comboboxMetaData = [
    {columnName: 'accountNumber', columnWidth: '63px'},
    {columnName: 'accountName', columnWidth: '243px', showData: true},
    {columnName: 'subType', columnWidth: '76px'}
  ];

  constructor(props) {
    super(props);

    this.combobox = React.createRef();
  }

  openAllocationCombobox = event => {
    this.setState({
      isDisplayingCombobox: true,
    }, () => {
      const comboboxNode = ReactDOM.findDOMNode(this.combobox.current);
      const comboboxInputNode = comboboxNode.querySelector('input');
      comboboxInputNode.focus();
      comboboxInputNode.select();
    });
  };

  closeAllocationCombobox = event => {
    const comboboxNode = ReactDOM.findDOMNode(this.combobox.current);
    const isFocusOnCombobox = comboboxNode.contains(event.relatedTarget);

    if (!isFocusOnCombobox) {
      this.setState({
        isDisplayingCombobox: false,
      });
    }
  };

  render() {
    const { accounts, allocatedAccountName } = this.props;
    const { isDisplayingCombobox } = this.state;

    const enableFocus = {tabIndex: 0, role: 'button'};

    const allocatedAccount = accounts.find(account=> account.accountName === allocatedAccountName);

    let content;

    if (isDisplayingCombobox) {
      content =
        <Combobox
          ref={this.combobox}
          metaData={this.comboboxMetaData}
          onChange={item => {
            console.log('onChange', item);
          }}
          onSelect={item => {
            console.log('onSelect', item);
          }}
          noMatchFoundMessage=""
          items={accounts}
          defaultItem={allocatedAccount}
        />;
    }
    else if (allocatedAccount) {
      content = <span {...enableFocus}>{allocatedAccountName}</span>;
    }
    else {
      content = <a {...enableFocus}>Allocate Me</a>
    }

    return (
      <div
        onFocus={this.openAllocationCombobox}
        onClick={this.openAllocationCombobox}
        onBlur={this.closeAllocationCombobox}
      >
        {content}
      </div>
    );
  }
}

export default BankTransactionAccountAllocator;
