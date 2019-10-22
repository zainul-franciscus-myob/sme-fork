import {
  Alert,
  Button,
  HeaderSort,
  Icons,
  PageHead,
  StandardTemplate,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsDefaultFilters,
  getIsLoading,
  getOrder,
  getShowHiddenColumns,
} from '../contactListSelector';
import { getResponsiveConfig } from './getResponsiveConfig';
import ContactListFilterOptions from './ContactListFilterOptions';
import ContactListTable from './ContactListTable';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import PageView from '../../../components/PageView/PageView';
import style from './ContactListView.module.css';

const inActiveRowHeader = ({ order, onSort, tableConfig }) => (
  <Table.HeaderItem
    columnName={tableConfig.isActive.columnName}
    {...tableConfig.isActive.headerStyle}
  >
    <HeaderSort
      title={tableConfig.isActive.columnName}
      sortName="IsActive"
      activeSort={order}
      onSort={onSort}
    />
  </Table.HeaderItem>
);

const tableConfig = {
  name: { columnName: 'Name', style: { valign: 'top' }, headerStyle: { valign: 'middle' } },
  isActive: {
    columnName: 'Status',
    style: { valign: 'top', align: 'center' },
    headerStyle: { align: 'center', valign: 'middle' },
  },
  referenceId: { columnName: 'Contact ID', style: { valign: 'top' }, headerStyle: { valign: 'middle' } },
  type: { columnName: 'Type', style: { valign: 'top' }, headerStyle: { valign: 'middle' } },
  phoneNumber: { columnName: 'Phone number', style: { valign: 'top' }, headerStyle: { valign: 'middle' } },
  email: { columnName: 'Email', style: { valign: 'top' }, headerStyle: { valign: 'middle' } },
  outstandingBalance: {
    columnName: 'Balance due ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
  overdue: {
    columnName: 'Overdue ($)',
    style: { valign: 'top', align: 'right' },
    headerStyle: { align: 'right', valign: 'middle' },
  },
};

const ContactListView = (props) => {
  const {
    isLoading,
    isDefaultFilters,
    alert,
    onDismissAlert,
    onAddContactButtonClick,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    order,
    showHiddenColumns,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );
  const emptyTableView = isDefaultFilters ? (
    <NoResultPageState
      title="Save the details of people or businesses you deal with."
      description={
        "You'll save time when entering transactions and never lose their number again!"
      }
      actions={[
        <Button
          key={1}
          type="link"
          onClick={onAddContactButtonClick}
          icon={<Icons.Add />}
        >
          Create contact
        </Button>,
      ]}
    />
  ) : (
    <NoResultPageState
      title="No results found"
      description="Perhaps check spelling or remove filters and try again"
    />
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

  const tableHeader = (
    <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
      <Table.Header>
        <Table.HeaderItem
          columnName={tableConfig.name.columnName}
          {...tableConfig.name.headerStyle}
        >
          <HeaderSort
            title={tableConfig.name.columnName}
            sortName="Name"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        {showHiddenColumns
          ? inActiveRowHeader({ tableConfig, order, onSort })
          : undefined}
        <Table.HeaderItem
          columnName={tableConfig.referenceId.columnName}
          {...tableConfig.referenceId.headerStyle}
        >
          <HeaderSort
            title={tableConfig.referenceId.columnName}
            sortName="DisplayId"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.type.columnName}
          {...tableConfig.type.headerStyle}
        >
          <HeaderSort
            title={tableConfig.type.columnName}
            sortName="Type"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.phoneNumber.columnName}
          {...tableConfig.phoneNumber.headerStyle}
        >
          <HeaderSort
            title={tableConfig.phoneNumber.columnName}
            sortName="Phone"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.email.columnName}
          {...tableConfig.email.headerStyle}
        >
          <HeaderSort
            title={tableConfig.email.columnName}
            sortName="Email"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.outstandingBalance.columnName}
          {...tableConfig.outstandingBalance.headerStyle}
        >
          <HeaderSort
            title={tableConfig.outstandingBalance.columnName}
            sortName="CurrentBalance"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem
          columnName={tableConfig.overdue.columnName}
          {...tableConfig.overdue.headerStyle}
        >
          <HeaderSort
            title={tableConfig.overdue.columnName}
            sortName="Overdue"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      </Table.Header>
    </Table>
  );
  const contactListView = (
    <div className={style.contacts}>
      <StandardTemplate
        alert={alertComponent}
        sticky="all"
        pageHead={pageHead}
        filterBar={filterBar}
        tableHeader={tableHeader}
      >
        <ContactListTable
          tableConfig={tableConfig}
          emptyTableView={emptyTableView}
        />
      </StandardTemplate>
    </div>
  );

  return <PageView isLoading={isLoading} view={contactListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isDefaultFilters: getIsDefaultFilters(state),
  order: getOrder(state),
  showHiddenColumns: getShowHiddenColumns(state),
});

export default connect(mapStateToProps)(ContactListView);
