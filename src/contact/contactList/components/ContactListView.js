import {
  Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../contactListSelector';
import Alert from '../../../components/Alert/Alert';
import ContactListFilterOptions from './ContactListFilterOptions';
import ContactListTable from './ContactListTable';
import style from './ContactListView.css';

const ContactListView = (props) => {
  const {
    isLoading,
    alert,
    onDismissAlert,
    onAddContactButtonClick,
    onUpdateFilters,
    onApplyFilter,
    onSort,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <ContactListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="Contacts">
      <Button onClick={onAddContactButtonClick}>Add contact</Button>
    </PageHead>
  );

  const contactListView = (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          <ContactListTable
            onSort={onSort}
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
