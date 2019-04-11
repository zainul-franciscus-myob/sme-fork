import {
  DatePicker, Input, InputLabel, RadioButton, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getHeaderOptions } from '../receiveMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import Combobox from '../../../components/Feelix/ComboBox/Combobox';
import styles from './ReceiveMoneyDetailOptions.css';

const ContactCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '10rem' },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'contactType', columnWidth: '10rem' },
  ];

  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      label="Pay from"
      name="Pay From Contacts"
      hideLabel={false}
      hintText="Select contact"
    />
  );
};

ContactCombobox.defaultProps = {
  selectedIndex: null,
};

ContactCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};


class ReceiveMoneyDetailOptions extends Component {
  handleInputChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  }

  handleRadioChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({
      key: name,
      value: value === 'true',
    });
  }

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  }

  handleComboBoxChange = key => (item) => {
    const { onUpdateHeaderOptions } = this.props;
    onUpdateHeaderOptions({ key, value: item.id });
  }

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isTaxInclusive,
        description,
        payFromContacts,
        depositIntoAccounts,
        selectedDepositIntoAccountIndex,
        selectedPayFromContactIndex,
      },
    } = this.props;

    return (
      <React.Fragment>
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <div>
          <DatePicker
            label="Date"
            name="Date"
            value={date}
            onSelect={this.handleDateChange}
          />
        </div>
        <div className="form-group">
          <InputLabel label="Amounts are" id="isTaxInclusive" />
          <div className={styles.radioGroup}>
            <div>
              <RadioButton
                name="isTaxInclusive"
                label="Tax inclusive"
                value="true"
                checked={isTaxInclusive}
                onChange={this.handleRadioChange}
              />
            </div>
            <div>
              <RadioButton
                name="isTaxInclusive"
                label="Tax exclusive"
                value="false"
                checked={!isTaxInclusive}
                onChange={this.handleRadioChange}
              />
            </div>
          </div>
        </div>
        <AccountCombobox
          label="Deposit into"
          hideLabel={false}
          items={depositIntoAccounts}
          selectedIndex={selectedDepositIntoAccountIndex}
          onChange={this.handleComboBoxChange('selectedDepositIntoAccountId')}
        />
        <ContactCombobox
          items={payFromContacts}
          selectedIndex={selectedPayFromContactIndex}
          onChange={this.handleComboBoxChange('selectedPayFromContactId')}
        />
        <div />
        <TextArea
          name="description"
          label="Description"
          autoSize
          maxLength={255}
          placeholder="Max 255 characters"
          resize="vertical"
          value={description}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  headerOptions: getHeaderOptions(state),
});

ReceiveMoneyDetailOptions.propTypes = {
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  headerOptions: PropTypes.shape({
    referenceId: PropTypes.string,
    date: PropTypes.string,
    gstReportingMethod: PropTypes.string,
    isEndOfYearAdjustment: PropTypes.bool,
    isTaxInclusive: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(ReceiveMoneyDetailOptions);
