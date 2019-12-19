import {
  DatePicker, Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getHeaderOptions, getPrefillStatus } from '../spendMoneyDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import styles from './SpendMoneyDetailSecondaryOptions.module.css';

const SpendMoneyDetailSecondaryOptions = ({
  headerOptions: {
    referenceId,
    date,
    isTaxInclusive,
    taxInclusiveLabel,
    taxExclusiveLabel,
  },
  onUpdateHeaderOptions,
  prefillStatus,
}) => {
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  };

  const handleDateChange = ({ value }) => {
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  };

  return (
    <React.Fragment>
      <Input
        name="referenceId"
        label="Reference number"
        requiredLabel="This is required"
        maxLength={8}
        value={referenceId}
        onChange={handleInputChange}
      />
      <div
        className={classnames(styles.formControlWrapper, {
          [styles.prefilled]: prefillStatus.date,
        })}
      >
        <DatePicker
          label="Date"
          requiredLabel="This is required"
          name="Date"
          value={date}
          onSelect={handleDateChange}
        />
      </div>
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateHeaderOptions}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  headerOptions: getHeaderOptions(state),
  prefillStatus: getPrefillStatus(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailSecondaryOptions);
