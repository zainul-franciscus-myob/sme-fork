import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import {
  getAlertMessage, getModalType, getSuperFundPageTitle,
} from '../SuperFundNoPaySuperSelectors';
import FormCard from '../../../../components/FormCard/FormCard';
import SuperFundDetailActions from './SuperFundDetailActions';
import SuperFundDetailModal from '../../components/SuperFundDetailModal';
import SuperFundDetailSection from './SuperFundDetailSection';
import SuperFundNoPaySuperContactDetails from './SuperFundNoPaySuperContactDetails';

const SuperFundNoPaySuperView = ({
  listeners, modalType, alertMessage, pageTitle,
}) => {
  const modal = modalType && (
    <SuperFundDetailModal
      modalType={modalType}
      listeners={listeners}
    />
  );

  const alert = alertMessage && (
    <Alert type="danger" onDismiss={listeners.onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const view = (
    <Fragment>
      {modal}
      <FormTemplate
        pageHead={pageTitle}
        alert={alert}
      >
        <FormCard>
          <SuperFundDetailSection listeners={listeners} />
          <SuperFundNoPaySuperContactDetails listeners={listeners} />
        </FormCard>
        <SuperFundDetailActions listeners={listeners} />
      </FormTemplate>
    </Fragment>
  );

  return view;
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  pageTitle: getSuperFundPageTitle(state),
});

export default connect(mapStateToProps)(SuperFundNoPaySuperView);