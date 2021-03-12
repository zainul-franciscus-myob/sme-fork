import {
  Alert,
  Checkbox,
  CheckboxGroup,
  DetailHeader,
  Input,
  RadioButton,
  RadioButtonGroup,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  getHeaderOptions,
  getIsBeforeStartOfFinancialYear,
  getIsSystem,
  getShouldShowTaxOptions,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../generalJournalDetailSelectors';
import DatePicker from '../../../../components/DatePicker/DatePicker';

class GeneralJournalDetailOptions extends Component {
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

  handleCheckboxChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { checked, name } = e.target;

    onUpdateHeaderOptions({ key: name, value: checked });
  };

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  };

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
      isSystem,
      isBeforeStartOfFinancialYear,
      shouldShowTaxOptions,
    } = this.props;

    const isPurchase = gstReportingMethod === 'purchase';
    const isSale = gstReportingMethod === 'sale';

    const eofyAdjustmentAlert = isSystem && (
      <Alert type="info">
        This general journal is read only because it is an end of financial year
        adjustment.
      </Alert>
    );

    const primary = (
      <React.Fragment>
        <DatePicker
          label="Date"
          requiredLabel="This is required"
          name="Date"
          value={date}
          disabled={isSystem}
          onSelect={this.handleDateChange}
          displayWarning={!isSystem && isBeforeStartOfFinancialYear}
          warningMessage={'The date is set to a previous financial year'}
        />
        {shouldShowTaxOptions && (
          <RadioButtonGroup
            label="Display in GST report as:"
            requiredLabel="This is required"
            name="gstReportingMethod"
            disabled={isSystem}
            renderRadios={({ value, ...props }) => (
              <React.Fragment>
                <RadioButton
                  {...props}
                  label="Purchase"
                  value="purchase"
                  checked={isPurchase}
                  onChange={this.handleInputChange}
                />
                <RadioButton
                  {...props}
                  label="Sale"
                  value="sale"
                  checked={isSale}
                  onChange={this.handleInputChange}
                />
              </React.Fragment>
            )}
          />
        )}
        <TextArea
          name="description"
          label="Description of transaction"
          autoSize
          rows={1}
          maxLength={255}
          resize="vertical"
          value={description}
          disabled={isSystem}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );

    const secondary = (
      <React.Fragment>
        <Input
          maxLength={13}
          name="referenceId"
          label="Reference number"
          requiredLabel="This is required"
          value={referenceId}
          disabled={isSystem}
          onChange={this.handleInputChange}
        />
        <CheckboxGroup
          label="Mark this journal as"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isEndOfYearAdjustment"
              label="EOFY adjustment"
              labelAccessory={
                <Tooltip>
                  When running reports you have the option to include or exclude
                  entries marked as end of financial year (EOFY) adjustments
                </Tooltip>
              }
              checked={isEndOfYearAdjustment}
              disabled={isSystem}
              onChange={this.handleCheckboxChange}
            />
          )}
        />
        {shouldShowTaxOptions && (
          <RadioButtonGroup
            label="Amounts are"
            name="isTaxInclusive"
            disabled={isSystem}
            renderRadios={({ value, ...props }) => (
              <React.Fragment>
                <RadioButton
                  {...props}
                  checked={isTaxInclusive}
                  onChange={this.handleRadioChange}
                  value="true"
                  label={taxInclusiveLabel}
                />
                <RadioButton
                  {...props}
                  checked={!isTaxInclusive}
                  onChange={this.handleRadioChange}
                  value="false"
                  label={taxExclusiveLabel}
                />
              </React.Fragment>
            )}
          />
        )}
      </React.Fragment>
    );

    return (
      <>
        {eofyAdjustmentAlert}
        <DetailHeader primary={primary} secondary={secondary} />
      </>
    );
  };
}
// TODO: refactor to be component function

const mapStateToProps = (state) => ({
  headerOptions: getHeaderOptions(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isSystem: getIsSystem(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
  shouldShowTaxOptions: getShouldShowTaxOptions(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailOptions);
