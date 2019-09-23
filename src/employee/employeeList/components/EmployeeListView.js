import {
  Alert,
  Button,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../EmployeeListSelectors';
import EmployeeListFilterOptions from './EmployeeListFilterOptions';
import EmployeeListTable from './EmployeeListTable';
import PageView from '../../../components/PageView/PageView';
import style from './EmployeeListView.module.css';

const EmployeeListView = ({
  onEmployeeCreateButtonClick,
  onUpdateFilterBarOptions,
  isLoading,
  onApplyFilter,
  alert,
  onDismissAlert,
  onSort,
}) => {
  const pageHead = (
    <PageHead title="Employees">
      <Button onClick={onEmployeeCreateButtonClick}>Create employee</Button>
    </PageHead>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <EmployeeListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const employeeListView = (
    <StandardTemplate alert={alertComponent} sticky="none" pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <EmployeeListTable onSort={onSort} />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={employeeListView} />;
};

EmployeeListView.defaultProps = {
  alert: undefined,
};

EmployeeListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onUpdateFilterBarOptions: PropTypes.func.isRequired,
  onEmployeeCreateButtonClick: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  alert: PropTypes.shape(),
  onSort: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(EmployeeListView);
