import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading,
} from '../contactListSelector';
import ContactListFilterOptions from './ContactListFilterOptions';
import ContactListTable from './ContactListTable';
import PageView from '../../../components/PageView/PageView';
import style from './ContactListView.module.css';

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
      <Button onClick={onAddContactButtonClick}>Create contact</Button>
    </PageHead>
  );

  const contactListView = (
    <StandardTemplate alert={alertComponent} sticky="none" pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <ContactListTable
          onSort={onSort}
        />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={contactListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ContactListView);
