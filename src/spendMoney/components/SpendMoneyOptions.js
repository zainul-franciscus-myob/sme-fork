import {
  Checkbox, Columns, DatePicker, Input, InputLabel, RadioButton, TextArea,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AccountCombobox from '../../components/AccountCombobox';
import Combobox from '../../components/Feelix/ComboBox/Combobox';
import styles from './SpendMoneyOptions.css';

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
  if (typeof selectedIndex === 'number') {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      label="Pay to"
      name="Pay To Contacts"
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


class SpendMoneyOptions extends Component {
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

  handleCheckboxChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { checked, name } = e.target;

    onUpdateHeaderOptions({ key: name, value: checked });
  }

  handleDateChange = (value) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  }

  handleComboBoxChange = key => (value) => {
    const { onUpdateHeaderOptions } = this.props;
    onUpdateHeaderOptions({ key, value });
  }

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isReportable,
        isTaxInclusive,
        description,
        payToContacts,
        payFromAccounts,
      },
    } = this.props;

    return (
      <Columns type="three">
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <div>
          <InputLabel label="Date" id="date" />
          <DatePicker inputProps={{ id: 'date' }} dateTime={date} onChange={this.handleDateChange} />
        </div>
        <div className="form-group">
          <InputLabel label="Amounts are" id="isTaxInclusive" />
          <div className={styles.radioGroup}>
            <div><RadioButton name="isTaxInclusive" label="Tax inclusive" value="true" checked={isTaxInclusive} onChange={this.handleRadioChange} /></div>
            <div><RadioButton name="isTaxInclusive" label="Tax exclusive" value="false" checked={!isTaxInclusive} onChange={this.handleRadioChange} /></div>
          </div>
        </div>
        <div className="form-group">
          <AccountCombobox
            items={payFromAccounts}
            onChange={() => {}}
          />
        </div>
        <div className="form-group">
          <ContactCombobox
            items={payToContacts}
            onChange={() => {}}
          />
        </div>
        <div className="form-group">
          <div className={styles.checkbox}>
            <Checkbox name="reportable" label="Reportable" checked={isReportable} onChange={this.handleCheckboxChange} />
          </div>
        </div>
        <TextArea name="description" label="Description" autoSize maxLength={255} placeholder="Max 255 characters" value={description} onChange={this.handleInputChange} />
      </Columns>
    );
  }
}

SpendMoneyOptions.propTypes = {
  headerOptions: PropTypes.shape({
    referenceId: PropTypes.string,
    date: PropTypes.string,
    gstReportingMethod: PropTypes.string,
    isEndOfYearAdjustment: PropTypes.bool,
    isTaxInclusive: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
};

export default SpendMoneyOptions;
