import {
  Button, ButtonRow, Card, Spinner,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getIsSubmitting,
} from '../businessDetailSelectors';
import Alert from '../../../components/Alert/Alert';
import BusinessDetailsSection from './BusinessDetailsSection';
import ContactDetailsSection from './ContactDetailsSection';
import FinancialYearSection from './FinancialYearSection';
import SimplePageTemplate from '../../../components/SimplePageTemplate/SimplePageTemplate';
import styles from './BusinessDetailView.css';

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
    <div className={styles.businessDetails}>
      {alertComponent}
      <SimplePageTemplate pageHead="Business Details">
        <Card>
          <div>
            <BusinessDetailsSection onChange={onChange} />
            <hr />
            <ContactDetailsSection onChange={onChange} />
            <hr />
            <FinancialYearSection />
          </div>
          <hr />
          <ButtonRow>
            <Button name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>Save</Button>
          </ButtonRow>
        </Card>
      </SimplePageTemplate>
    </div>
  );
  return (
    isLoading ? <Spinner /> : view
  );
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
