import { PageState } from '@myob/myob-widgets';
import React from 'react';

import DropZoneHorizontal from '../../../components/DropZone/DropZoneHorizontal';
import InTrayEmptyState from './assets/InTrayEmptyState.svg';
import ReceiveBillsFromSuppliers from './ReceiveBillsFromSuppliers';
import ScanWithPhone from './ScanWithPhone';
import UploadViaEmail from './UploadViaEmail';
import styles from './InTrayEmptyStateView.module.css';

const InTrayEmptyStateView = ({
  email,
  emptyStateListeners: {
    navigateToAppStore,
    navigateToGooglePlay,
    navigateToSuppliersWiki,
    onConfirmEmailGenerationButtonClick,
    onCopyEmailButtonClicked,
    onDismissAlert,
    onDismissConfirmEmailGeneration,
    onGenerateNewEmailButtonClick,
    onUpload,
    setUploadPopoverState,
  },
  isConfirmingEmailGeneration,
  isUploadPopoverOpen,
  region,
  uploadOptionsAlert,
}) => {
  return (
    <PageState
      title="Nothing in your In tray"
      actions={[
        <UploadViaEmail
          email={email}
          isConfirmingEmailGeneration={isConfirmingEmailGeneration}
          isUploadPopoverOpen={isUploadPopoverOpen}
          onCopyEmailButtonClicked={onCopyEmailButtonClicked}
          onConfirmEmailGenerationButtonClick={
            onConfirmEmailGenerationButtonClick
          }
          onDismissAlert={onDismissAlert}
          onDismissConfirmEmailGeneration={onDismissConfirmEmailGeneration}
          onGenerateNewEmailButtonClick={onGenerateNewEmailButtonClick}
          setUploadPopoverState={setUploadPopoverState}
          uploadOptionsAlert={uploadOptionsAlert}
        />,
        <ScanWithPhone
          navigateToAppStore={navigateToAppStore}
          navigateToGooglePlay={navigateToGooglePlay}
        />,
        <ReceiveBillsFromSuppliers
          navigateToSuppliersWiki={navigateToSuppliersWiki}
          region={region}
        />,
      ]}
      description={
        <>
          <p>
            Upload your bills and receipts into the In tray to pre-fill
            transactions.
          </p>

          <DropZoneHorizontal className={styles.dropZone} onUpload={onUpload} />
        </>
      }
      image={<img src={InTrayEmptyState} alt="No files in your In tray" />}
    />
  );
};

export default InTrayEmptyStateView;
