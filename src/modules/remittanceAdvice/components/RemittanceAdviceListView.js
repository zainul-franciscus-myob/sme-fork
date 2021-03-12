import { Alert, BaseTemplate, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert } from '../selectors/remittanceAdviceListSelectors';
import RemittanceAdviceListTable from './RemittanceAdviceListTable';

const RemittanceAdviceListView = ({
  alert,
  onDismissAlert,
  onSelectRemittanceAdvice,
  onSelectAllRemittanceAdviceList,
  onSort,
}) => {
  return (
    <BaseTemplate>
      <PageHead title="Remittance advice" />
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      <RemittanceAdviceListTable
        onSort={onSort}
        onSelectRemittanceAdvice={onSelectRemittanceAdvice}
        onSelectAllRemittanceAdviceList={onSelectAllRemittanceAdviceList}
      />
    </BaseTemplate>
  );
};
const mapStateToProps = (state) => ({
  alert: getAlert(state),
});

export default connect(mapStateToProps)(RemittanceAdviceListView);
