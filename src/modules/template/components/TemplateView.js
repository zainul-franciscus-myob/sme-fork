import {
  Alert, Button, PageHead, StickyHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getModalType } from '../templateSelectors';
import PageView from '../../../components/PageView/PageView';
import PreviewTemplate from '../../../components/PreviewTemplate/PreviewTemplate';
import TemplateDetails from './TemplateDetails';
import TemplateModal from './TemplateModal';
import TemplatePreview from './TemplatePreview/TemplatePreview';
import TemplatePreviewHeader from './TemplatePreviewHeader';

const TemplateView = ({
  onUpdateTemplateOptions,
  onFileSelected,
  onFileRemoved,
  onDismissAlert,
  onConfirmUnsave,
  onConfirmSave,
  onCloseModal,
  onEditBusinessDetails,
  onCancel,
  onSave,
  isLoading,
  alert,
  modalType,
}) => {
  const pageHead = (
    <StickyHeader>
      <PageHead title="Create template">
        <Button type="secondary" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </PageHead>
    </StickyHeader>
  );
  const previewHeader = <TemplatePreviewHeader />;
  const preview = <TemplatePreview />;
  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );
  const view = (
    <>
      {modalType && (
      <TemplateModal
        type={modalType}
        onConfirmUnsave={onConfirmUnsave}
        onConfirmSave={onConfirmSave}
        onCloseModal={onCloseModal}
      />
      )
      }
      <PreviewTemplate
        alert={alertComponent}
        pageHead={pageHead}
        details={(
          <TemplateDetails
            onUpdateTemplateOptions={onUpdateTemplateOptions}
            onFileSelected={onFileSelected}
            onFileRemoved={onFileRemoved}
            onEditBusinessDetails={onEditBusinessDetails}
          />
        )}
        preview={preview}
        previewHeader={previewHeader}
      />
    </>
  );
  return (
    <PageView view={view} isLoading={isLoading} />
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(TemplateView);
