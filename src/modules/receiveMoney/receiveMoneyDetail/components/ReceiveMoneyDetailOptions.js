import {
  DetailHeader,
  Input,
  RadioButton,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  getHeaderOptions,
  getIsBeforeStartOfFinancialYear,
} from '../selectors/receiveMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';

class ReceiveMoneyDetailOptions extends Component {
  handleInputChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  };

  handleRadioChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({
      key: name,
      value: value === 'true',
    });
  };

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  };

  handleComboBoxChange = (key) => (item) => {
    const { onUpdateHeaderOptions } = this.props;
    const value = item ? item.id : '';
    onUpdateHeaderOptions({ key, value });
  };

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isTaxInclusive,
        description,
        depositIntoAccountOptions = [],
        selectedDepositIntoAccountId,
        selectedPayFromContactId,
      },
      onUpdateHeaderOptions,
      renderContactCombobox,
      isBeforeStartOfFinancialYear,
    } = this.props;

    const primary = (
      <React.Fragment>
        <AccountCombobox
          label="Bank account"
          hideLabel={false}
          requiredLabel="This is required"
          items={depositIntoAccountOptions}
          selectedId={selectedDepositIntoAccountId}
          onChange={this.handleComboBoxChange('selectedDepositIntoAccountId')}
        />
        {renderContactCombobox({
          selectedId: selectedPayFromContactId,
          label: 'Contact (payer)',
          hideLabel: false,
          allowClear: true,
          onChange: handleAutoCompleteChange(
            'selectedPayFromContactId',
            onUpdateHeaderOptions
          ),
          width: 'xl',
        })}
        <TextArea
          name="description"
          label="Description of transaction"
          rows={1}
          autoSize
          maxLength={255}
          resize="vertical"
          value={description}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );

    const secondary = (
      <React.Fragment>
        <Input
          name="referenceId"
          maxLength={13}
          label="Reference number"
          requiredLabel="This is required"
          value={referenceId}
          onChange={this.handleInputChange}
        />
        <DatePicker
          label="Date"
          requiredLabel="This is required"
          name="Date"
          value={date}
          onSelect={this.handleDateChange}
          displayWarning={isBeforeStartOfFinancialYear}
          warningMessage={'The date is set to a previous financial year'}
        />
        <RadioButtonGroup
          label="Amounts are"
          name="isTaxInclusive"
          renderRadios={({ value, ...props }) => (
            <React.Fragment>
              <RadioButton
                {...props}
                checked={isTaxInclusive}
                onChange={this.handleRadioChange}
                value="true"
                label="Tax inclusive"
              />
              <RadioButton
                {...props}
                checked={!isTaxInclusive}
                onChange={this.handleRadioChange}
                value="false"
                label="Tax exclusive"
              />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );

    return <DetailHeader primary={primary} secondary={secondary} />;
  };
}

const mapStateToProps = (state) => ({
  headerOptions: getHeaderOptions(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailOptions);
