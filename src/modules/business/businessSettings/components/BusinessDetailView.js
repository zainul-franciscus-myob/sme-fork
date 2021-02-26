import { Alert, Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLoadingState,
  getMyAccountLink,
} from '../businessSettingsSelectors';
import BusinessDetailsSection from './BusinessDetailsSection';
import ContactDetailsSection from './ContactDetailsSection';
import FinancialYearSection from './FinancialYearSection';
import LockDateSection from './LockDateSection';
import PageView from '../../../../components/PageView/PageView';

const BusinessDetailView = ({
  loadingState,
  onChange,
  onFinancialYearSettingsChange,
  onStartNewFinancialYear,
  onLockDateDetailChange,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  shouldDisplayAccountBillingMenuText,
  shouldDisplaySpecificIndustry,
  onIndustryChange,
  myAccountLink,
}) => {
  const view = (
    <Card>
      {shouldDisplayAccountBillingMenuText && (
        <Alert type="info">
          Changes made here will not be reflected in the bills you receive from
          MYOB. To review your account and billing details with MYOB,
          visit&nbsp;
          <a href={myAccountLink}>My Account.</a>
        </Alert>
      )}
      <BusinessDetailsSection
        onChange={onChange}
        shouldDisplaySpecificIndustry={shouldDisplaySpecificIndustry}
        onIndustryChange={onIndustryChange}
      />
      <ContactDetailsSection onChange={onChange} />
      <FinancialYearSection
        onFinancialYearSettingsChange={onFinancialYearSettingsChange}
        onStartNewFinancialYear={onStartNewFinancialYear}
        onCloseFinancialYearModal={onCloseFinancialYearModal}
        onOpenFinancialYearModal={onOpenFinancialYearModal}
      />
      <LockDateSection onChange={onLockDateDetailChange} />
    </Card>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

BusinessDetailView.defaultProps = {
  alert: undefined,
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  myAccountLink: getMyAccountLink(state),
});

export default connect(mapStateToProps)(BusinessDetailView);
