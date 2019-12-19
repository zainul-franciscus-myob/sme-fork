import {
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DetailHeader,
  Input,
  RadioButton,
  RadioButtonGroup,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getHeaderOptions, getTaxExclusiveLabel, getTaxInclusiveLabel } from '../generalJournalDetailSelectors';

class GeneralJournalDetailOptions extends Component {
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

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  }

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isTaxInclusive,
        description,
        gstReportingMethod,
        isEndOfYearAdjustment,
      },
      taxInclusiveLabel,
      taxExclusiveLabel,
    } = this.props;

    const isPurchase = gstReportingMethod === 'purchase';
    const isSale = gstReportingMethod === 'sale';

    const primary = (
      <React.Fragment>
        <DatePicker
          label="Date"
          requiredLabel="This is required"
          name="Date"
          value={date}
          onSelect={this.handleDateChange}
        />
        <RadioButtonGroup
          label="Display in GST report as:"
          requiredLabel="This is required"
          name="gstReportingMethod"
          renderRadios={({ value, ...props }) => (
            <React.Fragment>
              <RadioButton {...props} label="Purchase" value="purchase" checked={isPurchase} onChange={this.handleInputChange} />
              <RadioButton {...props} label="Sale" value="sale" checked={isSale} onChange={this.handleInputChange} />
            </React.Fragment>
          )}
        />
        <TextArea
          name="description"
          label="Description of transaction"
          autoSize
          rows={1}
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
          maxLength={8}
          name="referenceId"
          label="Reference number"
          requiredLabel="This is required"
          value={referenceId}
          onChange={this.handleInputChange}
        />
        <CheckboxGroup
          label="Mark this journal as"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isEndOfYearAdjustment"
              label="EOFY adjustment"
              labelAccessory={(
                <Tooltip>
                  When running reports you have the option to include or
                  exclude entries marked as end of financial year (EOFY) adjustments
                </Tooltip>
              )}
              checked={isEndOfYearAdjustment}
              onChange={this.handleCheckboxChange}
            />
          )}
        />
        <RadioButtonGroup
          label="Amounts are"
          name="isTaxInclusive"
          renderRadios={({ value, ...props }) => (
            <React.Fragment>
              <RadioButton {...props} checked={isTaxInclusive} onChange={this.handleRadioChange} value="true" label={taxInclusiveLabel} />
              <RadioButton {...props} checked={!isTaxInclusive} onChange={this.handleRadioChange} value="false" label={taxExclusiveLabel} />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );

    return (
      <DetailHeader primary={primary} secondary={secondary} />
    );
  }
}

const mapStateToProps = state => ({
  headerOptions: getHeaderOptions(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailOptions);
