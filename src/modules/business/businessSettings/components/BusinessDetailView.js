import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../businessSettingsSelectors';
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
}) => {
  const view = (
    <Card>
      <BusinessDetailsSection onChange={onChange} />
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
});

export default connect(mapStateToProps)(BusinessDetailView);
