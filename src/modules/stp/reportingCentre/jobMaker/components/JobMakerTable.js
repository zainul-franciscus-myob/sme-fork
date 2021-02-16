import {
  Card,
  Dropdown,
  Icons,
  MoreIcon,
  PageState,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import JobMakerActionTypes from '../JobMakerActionTypes';
import NominationPopover from './NominationPopover';
import TableView from '../../../../../components/TableView/TableView';

const tableConfig = {
  firstName: {
    columnName: 'First name',
    width: 'flex-2',
    valign: 'middle',
  },
  lastName: {
    columnName: 'Surname or family name',
    width: 'flex-2',
    valign: 'middle',
  },
  nomination: {
    columnName: 'Nomination',
    width: 'flex-3',
    valign: 'middle',
    textWrap: 'wrap',
  },
  declaration: {
    columnName: 'Claim period declaration',
    width: 'flex-3',
    valign: 'middle',
    textWrap: 'wrap',
  },
  actions: {
    title: 'More Options',
    columnName: 'Actions',
    cellRole: 'actions',
    width: '90px',
    valign: 'middle',
  },
};

const JobMakerTable = ({
  isTableLoading,
  currentPeriodDetails,
  employees,
  onDropdownItemClicked,
}) => {
  const dropDownItemsList = [
    {
      key: 'nominateEmployee',
      value: JobMakerActionTypes.Nominate,
      label: 'Nominate employee',
      disabled: false,
    },
    {
      key: 'declareEmployee',
      value: JobMakerActionTypes.Claim,
      label: 'Declare for claim period',
      disabled: true,
    },
    {
      key: 'removeDeclaration',
      value: JobMakerActionTypes.CancelClaim,
      label: 'Remove declaration',
      disabled: true,
    },
    {
      key: 'removeNomination',
      value: JobMakerActionTypes.CancelNominate,
      label: 'Remove nomination',
      disabled: true,
    },
    {
      key: 'updateEmployeeDetails',
      value: JobMakerActionTypes.UpdateEmployee,
      label: 'Update employee details',
      disabled: true,
    },
  ];
  const dropdownItems = dropDownItemsList.map((dropdownItem) => {
    return <Dropdown.Item {...dropdownItem}></Dropdown.Item>;
  });

  const dropdownToggle = (
    <Dropdown.Toggle type="clear" aria-label="more options" size="xs">
      <MoreIcon size="16px" />
    </Dropdown.Toggle>
  );
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.firstName}>
        {tableConfig.firstName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.lastName}>
        {tableConfig.lastName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.nomination}>
        {tableConfig.nomination.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.declaration}>
        <div>
          {tableConfig.declaration.columnName}
          <span testid="JM-column-declaration-tooltip">
            &nbsp;
            <Tooltip triggerContent={<Icons.Info />} placement="top">
              Employee worked on average more than 20 hours per week.
            </Tooltip>
          </span>
          <br />
          <sub>Coming soon</sub>
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.actions}>
        <div>
          {tableConfig.actions.columnName}
          <span testid="JM-column-action-tooltip">
            &nbsp;
            <Tooltip triggerContent={<Icons.Info />} placement="top">
              Declarations and employee updates are coming soon.
            </Tooltip>
          </span>
        </div>
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees?.map((row) => (
    <Table.Row key={row.employeeId} rowData={{ id: row.employeeId }}>
      <Table.RowItem {...tableConfig.firstName}>{row.firstName}</Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>{row.lastName}</Table.RowItem>
      <Table.RowItem {...tableConfig.nomination}>
        <NominationPopover
          nomination={row.nomination}
          testid={`nomination-button-${row.employeeId}`}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.declaration}>
        {row.declaration}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.actions}>
        <Dropdown
          left
          items={dropdownItems}
          onSelect={(actionType) => onDropdownItemClicked(row, actionType)}
          toggle={dropdownToggle}
          testid={`dropdownlist-${row.employeeId}`}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  const emptyView = (
    <PageState
      title="No employees"
      description="Make sure you've entered their date of birth and start date, and have included them in a pay run."
      testid="JM-emptyEmployee-state"
    />
  );

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={employees.length === 0}
      emptyView={emptyView}
      hasActions
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );

  const cardBody = (
    <>
      <h3 testid="JM-table-header">
        JobMaker claim period {currentPeriodDetails.period}&nbsp;(
        {currentPeriodDetails.periodStart} -&nbsp;
        {currentPeriodDetails.periodEnd})
      </h3>
      <div>
        <p>
          Only employees between 16 and 35, who started employment from 7
          October 2020 are listed. Visit our help for a full list of&nbsp;
          <a
            href="https://help.myob.com/wiki/x/mAaFAw#expand-3Nominateeligibleemployees"
            target="_blank"
            rel="noopener noreferrer"
          >
            eligibility requirements.
          </a>
          <br />
          <b>Employee missing?</b> Make sure you&apos;ve entered their date of
          birth and start date, and have included them in a pay run.
        </p>
      </div>
      {table}
    </>
  );

  return <Card body={cardBody} />;
};

export default JobMakerTable;
