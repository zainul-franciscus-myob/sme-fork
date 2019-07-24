import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getModalType,
} from '../selectors/InTraySelectors';
import InTrayListFilterOptions from './inTrayList/InTrayListFilterOptions';
import InTrayListTable from './inTrayList/InTrayListTable';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import UploadOptionsModal from './uploadOptions/UploadOptionsModal';
import modalTypes from '../modalTypes';

const InTrayView = ({
  isLoading,
  alert,
  modalType,
  inTrayListeners: {
    onDismissAlert,
    onUploadOptionsButtonClicked,
  },
  inTrayListListeners: {
    onUpdateFilterOptions,
    onApplyFilter,
    onSort,
  },
  uploadOptionsModalListeners,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType === modalTypes.uploadOptions && (
    <UploadOptionsModal listeners={uploadOptionsModalListeners} />
  );

  const pageHead = (
    <PageHead title="In Tray">
      <Button type="secondary" onClick={onUploadOptionsButtonClicked}>More ways to upload</Button>
    </PageHead>
  );

  const filterBar = (
    <InTrayListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const inTrayView = (
    <React.Fragment>
      {modal}
      <StandardTemplate
        sticky="none"
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
      >
        <InTrayListTable onSort={onSort} />
      </StandardTemplate>
    </React.Fragment>
  );

  return isLoading ? (<LoadingPageState />) : inTrayView;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InTrayView);
