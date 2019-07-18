import {
  Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
  getModalType,
} from '../InTraySelectors';
import UploadOptionsModal from './UploadOptionsModal';
import modalTypes from '../modalTypes';

const InTrayView = ({
  isLoading, modalType, uploadOptionsModalListeners, onUploadOptionsButtonClicked,
}) => {
  const modal = modalType === modalTypes.uploadOptions && (
    <UploadOptionsModal listeners={uploadOptionsModalListeners} />
  );
  const pageHead = (
    <PageHead title="In Tray">
      <Button type="secondary" onClick={onUploadOptionsButtonClicked}>More ways to upload</Button>
    </PageHead>
  );
  const inTrayView = (
    <React.Fragment>
      {modal}
      <StandardTemplate
        sticky="none"
        pageHead={pageHead}
      />
    </React.Fragment>
  );

  return isLoading ? (<Spinner />) : inTrayView;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InTrayView);
