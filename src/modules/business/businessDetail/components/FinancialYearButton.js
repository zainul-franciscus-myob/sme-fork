import { Alert, Button, Field, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFinancialYearModal,
  getMonthOptions,
  getNewFinancialYearDetails,
} from '../businessDetailSelectors';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import MonthSelect from './MonthSelect';
import floatingLady from './floating-lady.svg';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './FinancialYearButton.module.css';

const FinancialYearButton = ({
  isOpen,
  isLoading,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  lastMonthInNewFinancialYear,
  monthOptions,
  onMonthSelect,
  startOfNewFinancialYear,
  endOfNewFinancialYear,
}) => {
  const body = isLoading ? (
    <LoadingPageState />
  ) : (
    <>
      <img
        className={styles.floatingLady}
        src={floatingLady}
        alt="floatingLady"
      />
      <div className={styles.mainText}>
        {
          "Starting a new financial year will update your account balances by moving current earnings to retained earnings. You'll still be able to enter transaction in the previous financial year."
        }
      </div>
      <MonthSelect
        name="lastMonthInNewFinancialYear"
        label="Last month in financial year"
        className={styles.monthSelect}
        value={lastMonthInNewFinancialYear}
        width="sm"
        monthOptions={monthOptions}
        onChange={handleSelectChange(onMonthSelect)}
      />
      <Alert type="info">{`Your next financial year will run from ${startOfNewFinancialYear} to ${endOfNewFinancialYear} We'll also update your lock date to the start of the new financial year.`}</Alert>
    </>
  );

  const modal = (
    <Modal
      size="small"
      title="Start a new financial year?"
      onCancel={onCloseFinancialYearModal}
    >
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          disabled={isLoading}
          onClick={onCloseFinancialYearModal}
        >
          Go back
        </Button>
        <Button
          type="primary"
          disabled={isLoading}
          onClick={onStartNewFinancialYear}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Field
      renderField={() => (
        <>
          <Button type="link" onClick={onOpenFinancialYearModal}>
            Start new financial year
          </Button>
          {isOpen && modal}
        </>
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  monthOptions: getMonthOptions(state),
  ...getFinancialYearModal(state),
  ...getNewFinancialYearDetails(state),
});

export default connect(mapStateToProps)(FinancialYearButton);
