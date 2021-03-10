import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getHeaderOptions,
  getIsBeforeStartOfFinancialYear,
  getIsSupplierBlocking,
  getPrefillStatus,
  getShouldShowIsTaxInclusiveAndTaxCodeColumn,
} from '../spendMoneyDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import styles from './SpendMoneyDetailSecondaryOptions.module.css';

const SpendMoneyDetailSecondaryOptions = ({
  isSupplierBlocking,
  headerOptions: {
    referenceId,
    date,
    isTaxInclusive,
    taxInclusiveLabel,
    taxExclusiveLabel,
  },
  onUpdateHeaderOptions,
  prefillStatus,
  isBeforeStartOfFinancialYear,
  shouldShowIsTaxInclusiveAndTaxCodeColumn,
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
        maxLength={13}
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
          displayWarning={isBeforeStartOfFinancialYear}
          warningMessage={'The date is set to a previous financial year'}
        />
      </div>
      {shouldShowIsTaxInclusiveAndTaxCodeColumn && (
        <BooleanRadioButtonGroup
          name="isTaxInclusive"
          label="Amounts are"
          value={isTaxInclusive}
          trueLabel={taxInclusiveLabel}
          falseLabel={taxExclusiveLabel}
          handler={onUpdateHeaderOptions}
          disabled={isSupplierBlocking}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isSupplierBlocking: getIsSupplierBlocking(state),
  headerOptions: getHeaderOptions(state),
  prefillStatus: getPrefillStatus(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
  shouldShowIsTaxInclusiveAndTaxCodeColumn: getShouldShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(SpendMoneyDetailSecondaryOptions);
