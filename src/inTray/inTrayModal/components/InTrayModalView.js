import {
  Alert, Button, Modal, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsEntryLoading,
  getIsLinkActionDisabled,
  getIsLoading,
  getIsOpen,
} from '../InTrayModalSelectors';
import InTrayModalFilterOptions from './InTrayModalFilterOptions';
import InTrayModalTable from './InTrayModalTable';
import PageView from '../../../components/PageView/PageView';
import styles from './InTrayModalView.module.css';

const InTrayModalView = ({
  isLoading,
  alert,
  isEntryLoading,
  isOpen,
  isActionDisabled,
  isLinkActionDisabled,
  inTrayModalListeners: {
    onDismissAlert,
    onCloseModal,
    onLinkButtonClick,
  },
  inTrayListListeners: {
    onUpdateFilterOptions,
    onApplyFilter,
    onSort,
    onUpload,
    onView,
    onSelect,
  },
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <InTrayModalFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const inTrayView = (
    <div className={isEntryLoading ? styles.submitting : ''}>
      { alertComponent }
      { filterBar }
      <Separator />
      <InTrayModalTable
        onSort={onSort}
        onUpload={onUpload}
        onView={onView}
        onSelect={onSelect}
      />
    </div>
  );

  const modal = (
    <Modal
      title="Link source document from In tray"
      onCancel={onCloseModal}
      size="large"
      canClose={!isActionDisabled}
    >
      <Modal.Body>
        <PageView isLoading={isLoading} view={inTrayView} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCloseModal}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onLinkButtonClick}
          disabled={isLinkActionDisabled}
        >
          Link
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen && modal;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isEntryLoading: getIsEntryLoading(state),
  alert: getAlert(state),
  isOpen: getIsOpen(state),
  isActionDisabled: getIsActionDisabled(state),
  isLinkActionDisabled: getIsLinkActionDisabled(state),
});

export default connect(mapStateToProps)(InTrayModalView);
