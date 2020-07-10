import { Alert, Button, PageHead, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getShowStatusColumn,
} from '../jobListSelector';
import { getResponsiveConfig } from './getResponsiveConfig';
import JobListFilterOptions from './JobListFilterOptions';
import JobListTable from './JobListTable';
import PageView from '../../../../components/PageView/PageView';
import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import style from './JobListView.module.css';

const statusColumnHeader = ({ tableConfig }) => (
  <Table.HeaderItem
    columnName={tableConfig.isActive.columnName}
    {...tableConfig.isActive.headerStyle}
  >
    Status
  </Table.HeaderItem>
);

const tableConfig = {
  number: {
    columnName: 'Job number',
    style: { valign: 'top' },
    headerStyle: { valign: 'middle' },
  },
  name: {
    columnName: 'Job name',
    style: { valign: 'top' },
    headerStyle: { valign: 'middle' },
  },
  isActive: {
    columnName: 'Status',
    style: { valign: 'top', align: 'center' },
    headerStyle: { align: 'center', valign: 'middle' },
  },
  income: {
    columnName: 'Income ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
  cost: {
    columnName: 'Cost of sales ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
  expenses: {
    columnName: 'Expenses ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
  netProfit: {
    columnName: 'Net Profit ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
};

const JobListView = (props) => {
  const {
    loadingState,
    alert,
    onDismissAlert,
    onAddJobButtonClick,
    onUpdateFilters,
    showStatusColumn,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = <JobListFilterOptions onUpdateFilters={onUpdateFilters} />;

  const pageHead = (
    <PageHead title="Jobs">
      <Button onClick={onAddJobButtonClick}>Create job</Button>
    </PageHead>
  );

  const tableHeader = (
    <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
      <Table.Header>
        <Table.HeaderItem
          columnName={tableConfig.number.columnName}
          {...tableConfig.number.headerStyle}
        >
          Job number
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.name.columnName}
          {...tableConfig.name.headerStyle}
        >
          Job name
        </Table.HeaderItem>
        {showStatusColumn ? statusColumnHeader({ tableConfig }) : undefined}
        <Table.HeaderItem
          columnName={tableConfig.income.columnName}
          {...tableConfig.income.headerStyle}
        >
          Income ($)
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.cost.columnName}
          {...tableConfig.cost.headerStyle}
        >
          Cost of sales ($)
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.expenses.columnName}
          {...tableConfig.expenses.headerStyle}
        >
          Expenses ($)
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.netProfit.columnName}
          {...tableConfig.netProfit.headerStyle}
        >
          Net profit ($)
        </Table.HeaderItem>
      </Table.Header>
    </Table>
  );

  const jobListView = (
    <div className={style.jobs}>
      <StandardTemplate
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
        tableHeader={tableHeader}
      >
        <JobListTable
          tableConfig={tableConfig}
          onAddJobButtonClick={onAddJobButtonClick}
        />
      </StandardTemplate>
    </div>
  );

  return <PageView loadingState={loadingState} view={jobListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  showStatusColumn: getShowStatusColumn(state),
});

export default connect(mapStateToProps)(JobListView);
