import { Alert, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsModalOpen, getPageTitle } from '../taxCombineSelectors';
import { getLoadingState } from '../../../job/jobDetail/jobDetailSelectors';
import PageView from '../../../../components/PageView/PageView';
import SmallScreenTemplate from '../../../../components/SmallScreenTemplate/SmallScreenTemplate';
import TaxCombineActions from './TaxCombineActions';
import TaxCombineForm from './TaxCombineForm';
import TaxCombineModal from './TaxCombineModal';

const TaxCombineView = ({
  alert,
  modal,
  loadingState,
  pageHeadTitle,
  onCancelButtonClick,
  onCombineButtonClick,
  onCloseModal,
  onConfirmCombine,
  onDismissAlert,
  onChange,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modalComponent = modal && (
    <TaxCombineModal onCancel={onCloseModal} onConfirm={onConfirmCombine} />
  );

  const view = (
    <SmallScreenTemplate>
      {alertComponent}
      {modalComponent}
      <PageHead title={pageHeadTitle} />
      <Card>
        <TaxCombineForm onChange={onChange} />
      </Card>
      {
        <TaxCombineActions
          onCombineButtonClick={onCombineButtonClick}
          onCancelButtonClick={onCancelButtonClick}
        />
      }
    </SmallScreenTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getIsModalOpen(state),
  loadingState: getLoadingState(state),
  pageHeadTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(TaxCombineView);
