import {
  Checkbox, Columns, DatePicker, Input, InputLabel, RadioButton, TextArea, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './GeneralJournalDetailOptions.css';

const GeneralJournalDetailOptions = () => (
  <Columns type="three">
    <Input name="reference" label="Reference" />
    <div>
      <InputLabel label="Date" id="date" />
      <DatePicker inputProps={{ id: 'date' }} />
    </div>
    <div className="form-group">
      <InputLabel label="Display in GST (BAS) report as:" id="gstReporting" />
      <div className={styles.radioGroup}>
        <div><RadioButton name="gstReporting" label="Purchase" value="purchase" onChange={f => f} /></div>
        <div><RadioButton name="gstReporting" label="Sale" value="sale" onChange={f => f} /></div>
      </div>
    </div>
    <div className="form-group">
      <InputLabel label="Mark this journal as" id="isEndOfYearAdjustment" />
      <Tooltip className={styles.tooltip}>
        When reporting, you can exclude these adjustments from appearing in the reports.
      </Tooltip>
      <div className={styles.checkbox}>
        <Checkbox name="isEndOfYearAdjustment" label="End of year adjustment" />
      </div>
    </div>
    <div className="form-group">
      <InputLabel label="Amounts are" id="isTaxInclusive" />
      <div className={styles.radioGroup}>
        <div><RadioButton name="isTaxInclusive" label="Tax inclusive" value="true" onChange={f => f} /></div>
        <div><RadioButton name="isTaxInclusive" label="Tax exclusive" value="false" onChange={f => f} /></div>
      </div>
    </div>
    <div />
    <TextArea name="description" label="Description" autoSize maxLength={255} placeholder="Max 255 characters" />
  </Columns>
);

export default GeneralJournalDetailOptions;
