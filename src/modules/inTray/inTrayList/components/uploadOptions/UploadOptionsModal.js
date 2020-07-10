import {
  Alert,
  Button,
  Icons,
  Input,
  Modal,
  Spinner,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmail,
  getIsConfirmingEmailGeneration,
  getIsUploadOptionsLoading,
  getUploadOptionsAlert,
} from '../../selectors/UploadOptionsSelectors';
import style from './UploadOptionsModal.module.css';

const UploadOptionsModal = ({
  listeners: {
    onCancel,
    onConfirmEmailGenerationButtonClick,
    onGenerateNewEmailButtonClick,
    onDismissAlert,
    onDismissConfirmEmailGeneration,
    onCopyEmailButtonClicked,
  },
  email,
  isConfirmingEmailGeneration,
  isUploadOptionsLoading,
  uploadOptionsAlert,
}) => {
  const confirmEmailGenerationButtonIcon = (
    <Tooltip placement="right" triggerContent={<Icons.Info />}>
      Use if you&apos;re having problems, such as irrelevant documents being
      added
    </Tooltip>
  );

  const confirmEmailGenerationButton = (
    <Button
      type="link"
      onClick={onConfirmEmailGenerationButtonClick}
      icon={confirmEmailGenerationButtonIcon}
      iconRight
      className={style.generateEmailAddress}
    >
      Generate new email address
    </Button>
  );

  const emailGenerationInfoAlert = (
    <Alert type="info" onDismiss={onDismissConfirmEmailGeneration}>
      Are you sure you want to generate a new email address? New documents sent
      to the old address will no longer appear here.&nbsp;
      <Button type="link" onClick={onGenerateNewEmailButtonClick}>
        Generate new email address
      </Button>
    </Alert>
  );

  const modalBody = (
    <Modal.Body>
      {uploadOptionsAlert && (
        <Alert type={uploadOptionsAlert.type} onDismiss={onDismissAlert}>
          {uploadOptionsAlert.message}
        </Alert>
      )}

      <h3>Email</h3>
      <p>
        Send documents to the email address below and they&apos;ll automatically
        appear in the In Tray. You can share the email address with your
        suppliers too.
      </p>

      <h3>Your In Tray email address:</h3>
      <div className={style.inTrayEmailAddress}>
        <Input
          disabled
          hideLabel
          label="Email"
          name="email"
          value={email}
          data-copy
        />
        <Button type="secondary" onClick={onCopyEmailButtonClicked}>
          Copy
        </Button>
      </div>
      {isConfirmingEmailGeneration
        ? emailGenerationInfoAlert
        : confirmEmailGenerationButton}

      <h3>Supplier feeds</h3>
      <p>
        We&apos;ve partnered with a number of large suppliers to have their
        invoices automatically sent to you.&nbsp;
        <a
          href="https://help.myob.com/wiki/x/qp5qAg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </p>

      <h3>Scan from your mobile</h3>
      <p>Use the MYOB Capture app to scan and send documents to In Tray.</p>
    </Modal.Body>
  );

  const spinner = (
    <div className={style.uploadOptionsSpinner}>
      <Spinner />
    </div>
  );

  return (
    <Modal title="More ways to upload documents" onCancel={onCancel}>
      {isUploadOptionsLoading ? spinner : modalBody}
      <Modal.Footer>
        <Button
          disabled={isUploadOptionsLoading}
          type="secondary"
          onClick={onCancel}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
  isConfirmingEmailGeneration: getIsConfirmingEmailGeneration(state),
  isUploadOptionsLoading: getIsUploadOptionsLoading(state),
  uploadOptionsAlert: getUploadOptionsAlert(state),
});

export default connect(mapStateToProps)(UploadOptionsModal);
