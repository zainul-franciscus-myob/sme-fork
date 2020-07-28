import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLoading, getIsOpen } from '../StpRegistrationAlertModalSelectors';
import PageView from '../../../../components/PageView/PageView';
import atoLogoImage from './ato-logo.svg';
import styles from './StpRegistrationAlertModal.module.css';

const stpRegistrationModal = ({ isOpen, isLoading, onCancel, onContinue }) => {
  const view = (
    <>
      <Modal.Body>
        <div className={styles.atoLogo}>
          <img src={atoLogoImage} alt="ATO logo" />
        </div>
        <h3>
          Don’t forget to report this payroll information to the ATO later!
        </h3>
        <p>
          This pay has been recorded, but we couldn’t report the payroll
          information to the ATO. Please check with someone in the business who
          normally declares information to the ATO. They will be able to send
          this payroll information from Single Touch Payroll reporting..
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button type="primary" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </>
  );

  return isOpen ? (
    <Modal
      title="Payroll information not reported to the ATO"
      onCancel={onCancel}
    >
      <PageView isLoading={isLoading} view={view} />
    </Modal>
  ) : null;
};

const mapStateToProps = (state) => ({
  isOpen: getIsOpen(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(stpRegistrationModal);
