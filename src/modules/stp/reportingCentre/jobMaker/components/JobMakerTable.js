import {
  Button,
  Card,
  Dropdown,
  Icons,
  MoreIcon,
  OpenExternalLinkIcon,
  PageState,
  Popover,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../../components/TableView/TableView';
import styles from './JobMakerView.module.css';

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
    width: 'flex-2',
    valign: 'middle',
    textWrap: 'wrap',
  },
  declaration: {
    columnName: 'Claim period declaration',
    width: 'flex-2',
    valign: 'middle',
    textWrap: 'wrap',
  },
  actions: {
    title: 'More Options',
    cellRole: 'actions',
    width: '36px',
    valign: 'middle',
  },
};

const JobMakerTable = ({ isTableLoading, currentPeriodDetails, employees }) => {
  const popOverContent = (
    <div testid="Popover">
      <p>
        Check employee nomination status by logging into either service below.
        Updates may take up to 72 hours to show with the ATO.
      </p>{' '}
      <a
        href="https://my.gov.au/LoginServices/main/login?execution=e5s1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenExternalLinkIcon /> ATO online services
      </a>
      <br></br>
      <a
        href="https://bp.ato.gov.au/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenExternalLinkIcon /> The Business portal
      </a>
    </div>
  );

  const dropdownItems = [
    <Dropdown.Item key="action1" label="Nominate employee" value="action1" />,
    <Dropdown.Item
      key="action2"
      label="Declare for claim period"
      value="action2"
    />,
    <Dropdown.Item key="action3" label="Remove declaration" value="action3" />,
    <Dropdown.Item key="action4" label="Remove nomination" value="action4" />,
    <Dropdown.Item
      key="action5"
      label="Update employee details"
      value="action5"
    />,
  ];
  const dropdownToggle = (
    <Dropdown.Toggle type="clear" aria-label="more options" size="xs">
      <MoreIcon size="16px" />
    </Dropdown.Toggle>
  );
  const dropdown = (
    <Dropdown
      right
      items={dropdownItems}
      onSelect={(e) => console.log(`${e} clicked`)}
      toggle={dropdownToggle}
    />
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
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.actions} />
    </Table.Header>
  );

  const rows = employees?.map((row) => (
    <Table.Row key={row.employeeId} rowData={{ id: row.employeeId }}>
      <Table.RowItem {...tableConfig.firstName}>{row.firstName}</Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>{row.lastName}</Table.RowItem>
      <Table.RowItem {...tableConfig.nomination}>
        <Popover
          body={<Popover.Body child={popOverContent} />}
          preferPlace={'below'}
          isOpen={false}
          closeOnOuterAction
          classes={[styles.atoPopOver]}
        >
          <Button type="link" testid={`nomination-button-${row.employeeId}`}>
            {row.nomination}
          </Button>
        </Popover>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.declaration}>
        {row.declaration}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.actions}>{dropdown}</Table.RowItem>
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
