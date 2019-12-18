import {
  Alert,
  Button,
  Input,
  Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
  getStpAlertMessage,
  getStpDeclarationName,
} from '../RecordPayRunSelectors';
import PageView from '../../../../components/PageView/PageView';
import atoLogoImage from './images/ato-logo.svg';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './StpDeclarationModal.module.css';

const StpDeclarationModal = ({
  name,
  alertMessage,
  isLoading,
  stpDeclarationListeners,
}) => {
  const {
    onChangeStpDeclaration,
    onCancelStpDeclaration,
    onSaveStpDeclaration,
    onDismissStpDeclarationAlert,
  } = stpDeclarationListeners;

  const alertView = alertMessage && (
    <Alert type="danger" onDismiss={onDismissStpDeclarationAlert}>
      {alertMessage}
    </Alert>
  );

  const view = (
    <>
      <Modal.Body>
        {alertView}
        <div className={styles.atoLogo}>
          <img src={atoLogoImage} alt="ATO logo" />
        </div>
        <p>
          I declare the information transmitted in this payroll report is true and
          correct and I am authorised to make this declaration.
        </p>
        <Input
          name="name"
          label="Authorised sender"
          requiredLabel="This field is required"
          value={name}
          onChange={handleInputChange(onChangeStpDeclaration)}
        />
        <p>
          Don&apos;t worry, you can still update this information later by processing
          another payroll with the changes.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancelStpDeclaration}>
          Go back
        </Button>
        <Button type="primary" onClick={onSaveStpDeclaration}>
          Send
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal title="Send payroll information to the ATO" onCancel={onCancelStpDeclaration}>
      <PageView isLoading={isLoading} view={view} />
    </Modal>
  );
};

const mapStateToProps = state => ({
  name: getStpDeclarationName(state),
  alertMessage: getStpAlertMessage(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(StpDeclarationModal);
