import {
  Checkbox, Columns, DatePicker, Input, InputLabel, RadioButton, TextArea, Tooltip,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './GeneralJournalDetailOptions.css';

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

  handleDateChange = (value) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  }

  render = () => {
    const {
      headerOptions: {
        referenceId, date, gstReportingMethod, isEndOfYearAdjustment, isTaxInclusive, description,
      },
    } = this.props;

    const isPurchase = gstReportingMethod === 'purchase';
    const isSale = gstReportingMethod === 'sale';

    return (
      <Columns type="three">
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <div>
          <InputLabel label="Date" id="date" />
          <DatePicker inputProps={{ id: 'date' }} dateTime={date} onChange={this.handleDateChange} />
        </div>
        <div className="form-group">
          <InputLabel label="Display in GST (BAS) report as:" id="gstReporting" />
          <div className={styles.radioGroup}>
            <div><RadioButton name="gstReportingMethod" label="Purchase" value="purchase" checked={isPurchase} onChange={this.handleInputChange} /></div>
            <div><RadioButton name="gstReportingMethod" label="Sale" value="sale" checked={isSale} onChange={this.handleInputChange} /></div>
          </div>
        </div>
        <div className="form-group">
          <InputLabel label="Mark this journal as" id="isEndOfYearAdjustment" />
          <Tooltip className={styles.tooltip}>
            When reporting, you can exclude these adjustments from appearing in the reports.
          </Tooltip>
          <div className={styles.checkbox}>
            <Checkbox name="isEndOfYearAdjustment" label="End of year adjustment" checked={isEndOfYearAdjustment} onChange={this.handleCheckboxChange} />
          </div>
        </div>
        <div className="form-group">
          <InputLabel label="Amounts are" id="isTaxInclusive" />
          <div className={styles.radioGroup}>
            <div><RadioButton name="isTaxInclusive" label="Tax inclusive" value="true" checked={isTaxInclusive} onChange={this.handleRadioChange} /></div>
            <div><RadioButton name="isTaxInclusive" label="Tax exclusive" value="false" checked={!isTaxInclusive} onChange={this.handleRadioChange} /></div>
          </div>
        </div>
        <div />
        <TextArea name="description" label="Description" autoSize maxLength={255} placeholder="Max 255 characters" value={description} onChange={this.handleInputChange} />
      </Columns>
    );
  }
}

GeneralJournalDetailOptions.propTypes = {
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

export default GeneralJournalDetailOptions;
