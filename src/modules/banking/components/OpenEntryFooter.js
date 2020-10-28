import {
  Button,
  ButtonRow,
  FileBrowser,
  Icons,
  Separator,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsOpenEntryCreating,
  getIsOpenEntryLoading,
  getShowCreateBankingRuleButton,
  getShowCreateTransferMoneyButton,
} from '../selectors';
import styles from './OpenEntryFooter.module.css';

const OpenEntryFooter = ({
  isCreating,
  isLoading,
  showCreateBankingRuleButton,
  showCreateTransferMoneyButton,
  onSave,
  onCancel,
  onUnmatch,
  onCreateRule,
  onOpenTransferMoneyModal,
  onLinkFromInTrayButtonClick,
  onAddAttachments,
}) => {
  const primaryButtons = [
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancel}
      disabled={isLoading}
    >
      Cancel
    </Button>,
    <Button
      key="save"
      name="save"
      type="primary"
      onClick={onSave}
      disabled={isLoading}
    >
      Save
    </Button>,
  ];

  const separatedPrimaryButtons = [
    isCreating && showCreateTransferMoneyButton && (
      <Button
        key="transferMoney"
        name="transferMoney"
        type="secondary"
        onClick={onOpenTransferMoneyModal}
      >
        Create transfer money
      </Button>
    ),
    !isCreating && (
      <Button
        key="unmatch"
        name="unmatch"
        type="secondary"
        onClick={onUnmatch}
        disabled={isLoading}
      >
        Unmatch
      </Button>
    ),
    showCreateBankingRuleButton && (
      <Button
        key="bankingRule"
        name="bankingRule"
        type="secondary"
        onClick={onCreateRule}
        disabled={isLoading}
      >
        Create rule
      </Button>
    ),
  ];

  const separator = separatedPrimaryButtons.length > 0 && (
    <Separator key="separator" direction="vertical" />
  );

  const attachFileButton = (
    <Tooltip
      triggerContent={
        <FileBrowser
          buttonType="link"
          buttonLabel={
            <Button type="link" as="span" icon={<Icons.File />}>
              Attach files
            </Button>
          }
          onFileSelected={onAddAttachments}
          className={styles.attachFileButton}
        />
      }
    >
      {
        "Upload your files as PDF, TIFF, JPEG or PNG and make sure it's below 10MB"
      }
    </Tooltip>
  );

  const linkInTrayButton = (
    <Button
      type="link"
      icon={<Icons.Archive />}
      onClick={onLinkFromInTrayButtonClick}
    >
      Link from In tray
    </Button>
  );

  return (
    <ButtonRow
      primary={[...separatedPrimaryButtons, separator, ...primaryButtons]}
      secondary={[attachFileButton, linkInTrayButton]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsOpenEntryCreating(state),
  isLoading: getIsOpenEntryLoading(state),
  showCreateBankingRuleButton: getShowCreateBankingRuleButton(state),
  showCreateTransferMoneyButton: getShowCreateTransferMoneyButton(state),
});

export default connect(mapStateToProps)(OpenEntryFooter);
