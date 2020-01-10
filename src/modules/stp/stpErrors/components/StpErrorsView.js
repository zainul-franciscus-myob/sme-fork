import {
  Alert, BaseTemplate, Button, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetailsErrors,
  getEmployeeInformationErrors,
  getErrorCount,
  getErrorMessage,
  getIsBusinessDetailsModalOpen,
  getPayItemsErrors,
} from '../stpErrorsSelectors';
import { getIsLoading } from '../../stpSetup/stepModules/NotifyAto/stpNotifyAtoModuleSelectors';
import BusinessDetailsErrorsCard from './BusinessDetailsErrorsCard';
import BusinessDetailsModal from './BusinessDetailsModal';
import EmployeeInformationErrorsCard from './EmployeeInformationErrorsCard';
import NoErrorsSplash from './NoErrorsSplash';
import PageView from '../../../../components/PageView/PageView';
import PayItemsErrorsCard from './PayItemsErrorsCard';

const StpErrorsView = ({
  onRefreshClick,
  onEmployeeNameClick,
  onPayItemClick,
  onGetStartedClick,
  onBusinessDetailsEditLinkClick,
  onModalCancel,
  onBusinessDetailsFieldChange,
  onBusinessDetailsSaveClick,
  isLoading,
  errorMessage,
  errorCount,
  businessDetailsErrors,
  businessDetailsModalIsOpen,
  employeeInformationErrors,
  payItemsErrors,
}) => {
  if (errorCount === 0 && !errorMessage && !isLoading) {
    return (
      <NoErrorsSplash
        onGetStartedClick={onGetStartedClick}
      />
    );
  }

  const pageHead = (
    <PageHead title="Single Touch Payroll setup errors" />
  );
  const alert = (
    errorMessage && <Alert type="danger">{errorMessage}</Alert>
  );

  const headerCard = (
    <Card>
      <h3>{`There are ${errorCount} items to fix`}</h3>
      <p>Once you&apos;ve fixed everything, you can refresh this list</p>
      <Button type="secondary" testid="refreshButton" onClick={onRefreshClick}>Refresh</Button>
    </Card>
  );

  const view = (
    <BaseTemplate>
      {pageHead}
      {alert}
      {headerCard}
      {businessDetailsModalIsOpen && (
        <BusinessDetailsModal
          onFieldChange={onBusinessDetailsFieldChange}
          onCancelClick={onModalCancel}
          onSaveClick={onBusinessDetailsSaveClick}
        />
      )}
      <BusinessDetailsErrorsCard
        errors={businessDetailsErrors}
        onEditLinkClick={onBusinessDetailsEditLinkClick}
      />
      <EmployeeInformationErrorsCard
        errors={employeeInformationErrors}
        onEmployeeNameClick={onEmployeeNameClick}
      />
      <PayItemsErrorsCard
        errors={payItemsErrors}
        onPayItemClick={onPayItemClick}
      />
    </BaseTemplate>
  );

  return (
    <PageView
      isLoading={isLoading}
      view={view}
    />
  );
};

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state),
  errorCount: getErrorCount(state),
  isLoading: getIsLoading(state),
  businessDetailsErrors: getBusinessDetailsErrors(state),
  employeeInformationErrors: getEmployeeInformationErrors(state),
  payItemsErrors: getPayItemsErrors(state),
  businessDetailsModalIsOpen: getIsBusinessDetailsModalOpen(state),
});

export default connect(mapStateToProps)(StpErrorsView);
