import {
  Alert,
  Button,
  InfoIcon,
  Input,
  MailIcon,
  Popover,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './InTrayEmptyStateView.module.css';

const UploadViaEmail = ({
  email,
  isConfirmingEmailGeneration,
  isUploadPopoverOpen,
  onConfirmEmailGenerationButtonClick,
  onCopyEmailButtonClicked,
  onDismissAlert,
  onDismissConfirmEmailGeneration,
  onGenerateNewEmailButtonClick,
  setUploadPopoverState,
  uploadOptionsAlert,
}) => {
  const popoverOpen = (action) => () => {
    action();
    setUploadPopoverState();
  };

  const confirmEmailGenerationButton = (
    <Button
      icon={
        <Tooltip placement="right" triggerContent={<InfoIcon />}>
          Use if you&apos;re having problems, such as irrelevant documents being
          added
        </Tooltip>
      }
      iconRight
      onClick={popoverOpen(onConfirmEmailGenerationButtonClick)}
      type="link"
    >
      Generate new email address
    </Button>
  );

  const emailGenerationInfoAlert = (
    <Alert type="info" onDismiss={onDismissConfirmEmailGeneration}>
      Are you sure you want to generate a new email address? New documents sent
      to the old address will no longer appear here.
      <Button onClick={popoverOpen(onGenerateNewEmailButtonClick)} type="link">
        Generate new email address
      </Button>
    </Alert>
  );

  return (
    <Popover
      appendTarget="#inTray"
      body={
        <Popover.Body
          child={
            <>
              {uploadOptionsAlert && (
                <Alert
                  onDismiss={onDismissAlert}
                  type={uploadOptionsAlert.type}
                >
                  {uploadOptionsAlert.message}
                </Alert>
              )}

              <h3>Upload via email</h3>

              <p>
                Send documents to the email address below and they&apos;ll
                automatically appear in your In tray. You can share the email
                address with your suppliers too.
              </p>

              <div className={styles.inTrayEmailAddress}>
                <Input
                  data-copy
                  disabled
                  hideLabel
                  label="Email"
                  name="email"
                  value={email}
                />

                <Button
                  onClick={popoverOpen(onCopyEmailButtonClicked)}
                  type="secondary"
                >
                  Copy
                </Button>
              </div>

              {isConfirmingEmailGeneration
                ? emailGenerationInfoAlert
                : confirmEmailGenerationButton}
            </>
          }
          classes={[styles.popoverBody]}
        />
      }
      className={styles.popover}
      closeOnOuterAction
      isOpen={isUploadPopoverOpen}
      preferPlace="above"
    >
      <Button type="link" icon={<MailIcon />}>
        Upload via email
      </Button>
    </Popover>
  );
};

export default UploadViaEmail;
