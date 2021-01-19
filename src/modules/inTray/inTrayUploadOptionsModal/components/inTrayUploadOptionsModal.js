import {
  Alert,
  Button,
  Columns,
  Icons,
  Input,
  Modal,
  OpenExternalLinkIcon,
  Spinner,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmail,
  getIsConfirmingEmailGeneration,
  getIsOpen,
  getIsUploadOptionsLoading,
  getUploadOptionsAlert,
} from '../selectors/inTrayUploadOptionsSelectors';
import App from '../../inTrayEmptyState/assets/App.svg';
import AppStore from '../../inTrayEmptyState/assets/AppStore.svg';
import Email from '../../inTrayEmptyState/assets/Email.svg';
import Feeds from '../../inTrayEmptyState/assets/Feeds.svg';
import GooglePlay from '../../inTrayEmptyState/assets/GooglePlay.svg';
import style from './inTrayUploadOptionsModal.module.css';

const UploadOptionsModal = ({
  isOpen,
  listeners: {
    navigateToAppStore,
    navigateToGooglePlay,
    navigateToSuppliersWiki,
    onCancel,
    onConfirmEmailGenerationButtonClick,
    onCopyEmailButtonClicked,
    onDismissAlert,
    onDismissConfirmEmailGeneration,
    onGenerateNewEmailButtonClick,
  },
  email,
  isConfirmingEmailGeneration,
  isUploadOptionsLoading,
  uploadOptionsAlert,
}) => {
  const confirmEmailGenerationButton = (
    <Button
      className={style.inTrayGenerationEmail}
      icon={
        <Tooltip placement="right" triggerContent={<Icons.Info />}>
          Use if you&apos;re having problems, such as irrelevant documents being
          added
        </Tooltip>
      }
      iconRight
      onClick={onConfirmEmailGenerationButtonClick}
      type="link"
    >
      Generate new email address
    </Button>
  );

  const emailGenerationInfoAlert = (
    <Alert
      className={style.inTrayGenerationEmailAlert}
      onDismiss={onDismissConfirmEmailGeneration}
      type="info"
    >
      Are you sure you want to generate a new email address? New documents sent
      to the old address will no longer appear here.{' '}
      <Button type="link" onClick={onGenerateNewEmailButtonClick}>
        Generate new email address
      </Button>
    </Alert>
  );

  const modalBody = (
    <Modal.Body className={style.uploadModal}>
      <Columns type="three">
        <div className={style.inTrayUpload}>
          {uploadOptionsAlert && (
            <Alert type={uploadOptionsAlert.type} onDismiss={onDismissAlert}>
              {uploadOptionsAlert.message}
            </Alert>
          )}

          <img
            alt="Upload via email"
            className={style.inTrayImages}
            height="110"
            src={Email}
            width="94"
          />

          <h3>Upload via email</h3>

          <p>
            Send documents to the email address below and they&apos;ll
            automatically appear in your In tray. You can share the email
            address with your suppliers too.
          </p>

          <h4>Your In tray email address</h4>

          <div className={style.inTrayEmailAddress}>
            <Input
              data-copy
              disabled
              hideLabel
              label="Email"
              name="email"
              value={email}
            />
            <Button type="secondary" onClick={onCopyEmailButtonClicked}>
              Copy
            </Button>
          </div>

          {isConfirmingEmailGeneration
            ? emailGenerationInfoAlert
            : confirmEmailGenerationButton}
        </div>

        <div>
          <img
            alt="Scan with your phone"
            className={style.inTrayImages}
            height="110"
            src={App}
            width="80"
          />

          <h3>Scan with your phone</h3>

          <p>
            Use the MYOB Capture app to scan and send documents to your In tray.
            The app is included in your subscription.
          </p>

          <img
            alt="Download on the App Store"
            className={style.inTrayApps}
            height="38"
            onClick={navigateToAppStore}
            role="presentation"
            src={AppStore}
          />

          <img
            alt="Get it on Google Play"
            className={style.inTrayApps}
            height="38"
            onClick={navigateToGooglePlay}
            role="presentation"
            src={GooglePlay}
          />
        </div>

        <div>
          <img
            alt="Automated supplier receipts"
            className={style.inTrayImages}
            height="110"
            src={Feeds}
            width="118"
          />

          <h3>Automated supplier receipts</h3>

          <p>
            We&apos;ve partnered with a number of large suppliers to have their
            invoices automatically sent to your In tray.
          </p>

          <Button
            icon={<OpenExternalLinkIcon />}
            iconRight
            onClick={navigateToSuppliersWiki}
            type="link"
          >
            All partners and how to connect
          </Button>
        </div>
      </Columns>
    </Modal.Body>
  );

  const spinner = <Spinner className={style.inTraySpinner} />;

  return (
    isOpen && (
      <Modal
        onCancel={onCancel}
        size="large"
        title="More ways to upload documents"
      >
        {isUploadOptionsLoading ? spinner : modalBody}
        <Modal.Footer>
          <Button
            disabled={isUploadOptionsLoading}
            onClick={onCancel}
            type="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
  isOpen: getIsOpen(state),
  isConfirmingEmailGeneration: getIsConfirmingEmailGeneration(state),
  isUploadOptionsLoading: getIsUploadOptionsLoading(state),
  uploadOptionsAlert: getUploadOptionsAlert(state),
});

export default connect(mapStateToProps)(UploadOptionsModal);
