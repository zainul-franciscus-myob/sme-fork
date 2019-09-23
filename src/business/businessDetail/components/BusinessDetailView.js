import {
  Alert, Button, ButtonRow, FormTemplate,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getIsSubmitting,
} from '../businessDetailSelectors';
import BusinessDetailsSection from './BusinessDetailsSection';
import ContactDetailsSection from './ContactDetailsSection';
import FinancialYearSection from './FinancialYearSection';
import FormCard from '../../../components/FormCard/FormCard';
import PageView from '../../../components/PageView/PageView';

const BusinessDetailView = ({
  isLoading,
  onChange,
  onSaveButtonClick,
  alert,
  onDismissAlert,
  isSubmitting,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );
  const view = (
    <FormTemplate pageHead="Business details" alert={alertComponent}>
      <FormCard>
        <BusinessDetailsSection onChange={onChange} />
        <ContactDetailsSection onChange={onChange} />
        <FinancialYearSection />
      </FormCard>
      <ButtonRow>
        <Button name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>Save</Button>
      </ButtonRow>
    </FormTemplate>
  );
  return <PageView isLoading={isLoading} view={view} />;
};

BusinessDetailView.defaultProps = {
  alert: undefined,
};

BusinessDetailView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  alert: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(BusinessDetailView);
