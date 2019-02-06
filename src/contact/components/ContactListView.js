import {
  PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../contactList/contactListSelector';
import Alert from '../../components/Alert/Alert';
import ContactListTable from './ContactListTable';
import style from './ContactListView.css';

const ContactListView = (props) => {
  const {
    businessId,
    isLoading,
    alert,
    onDismissAlert,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = <PageHead title="Contacts" />;

  const contactListView = (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead}>
        <div className={style.list}>
          <ContactListTable
            businessId={businessId}
          />
        </div>
      </StandardTemplate>
    </React.Fragment>
  );

  const view = isLoading ? (<Spinner />) : contactListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ContactListView);
