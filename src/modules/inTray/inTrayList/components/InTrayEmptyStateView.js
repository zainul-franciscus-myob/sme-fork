import { PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmail,
  getIsConfirmingEmailGeneration,
  getUploadOptionsAlert,
} from '../selectors/UploadOptionsSelectors';
import {
  getIsUploadPopoverOpen,
  getRegion,
} from '../selectors/InTraySelectors';
import InTrayDropzoneTableRow from './InTrayDropzoneTableRow';
import InTrayEmptyState from './assets/InTrayEmptyState.svg';
import ReceiveBillsFromSuppliers from './popovers/ReceiveBillsFromSuppliers';
import ScanWithPhone from './popovers/ScanWithPhone';
import UploadViaEmail from './popovers/UploadViaEmail';

const InTrayEmptyStateView = ({
  email,
  emptyStateListeners: {
    navigateToAppStore,
    navigateToGooglePlay,
    navigateToSuppliersWiki,
    onAddAttachments,
    onConfirmEmailGenerationButtonClick,
    onCopyEmailButtonClicked,
    onDismissAlert,
    onDismissConfirmEmailGeneration,
    onGenerateNewEmailButtonClick,
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

          <InTrayDropzoneTableRow onAddAttachment={onAddAttachments} />
        </>
      }
      image={<img src={InTrayEmptyState} alt="No files in your In tray" />}
    />
  );
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
  isConfirmingEmailGeneration: getIsConfirmingEmailGeneration(state),
  isUploadPopoverOpen: getIsUploadPopoverOpen(state),
  region: getRegion(state),
  uploadOptionsAlert: getUploadOptionsAlert(state),
});

export default connect(mapStateToProps)(InTrayEmptyStateView);
