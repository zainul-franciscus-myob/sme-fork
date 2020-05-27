import {
  Alert, Button, Field, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearModal } from '../businessDetailSelectors';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import floatingLady from './floating-lady.svg';
import styles from './FinancialYearButton.module.css';

const FinancialYearButton = ({
  isOpen,
  isLoading,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
}) => {
  const body = isLoading
    ? <LoadingPageState />
    : (
      <>
        <img className={styles.floatingLady} src={floatingLady} alt="floatingLady" />
        <p>{"Starting a new financial year will update your account balances by moving current earnings to retained earnings. You'll still be able to enter transaction in the previous financial year."}</p>
        <Alert type="info">{"We'll also update your lock date to the start of the new financial year."}</Alert>
      </>
    );

  const modal = (
    <Modal size="small" title="Start a new financial year?" onCancel={onCloseFinancialYearModal}>
      <Modal.Body>
        {body}
      </Modal.Body>
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
          <Button type="link" onClick={onOpenFinancialYearModal}>Start new financial year</Button>
          {isOpen && modal}
        </>
      )}
    />
  );
};

const mapStateToProps = state => getFinancialYearModal(state);

export default connect(mapStateToProps)(FinancialYearButton);
