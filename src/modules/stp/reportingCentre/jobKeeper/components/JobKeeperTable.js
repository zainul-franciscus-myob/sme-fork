import { Alert, Button, Card, Icons, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import EmployeeTierCombobox from './EmployeeTierCombobox';
import JobKeeperFortnightCombobox from './JobKeeperFortnightCombobox';
import TableView from '../../../../../components/TableView/TableView';
import styles from './JobKeeperTable.module.css';

const tableConfig = {
  firstName: {
    columnName: 'First name',
    width: 'flex-1',
    valign: 'middle',
  },
  lastName: {
    columnName: 'Surname or family name',
    width: 'flex-2',
    valign: 'middle',
  },
  firstFortnight: {
    columnName: 'First JobKeeper fortnight',
    width: 'flex-2',
    valign: 'middle',
    textWrap: 'wrap',
  },
  finalFortnight: {
    columnName: 'Final JobKeeper fortnight',
    width: 'flex-2',
    valign: 'middle',
    textWrap: 'wrap',
  },
  tier: {
    columnName: 'Employee tier',
    width: 'flex-2',
    valign: 'middle',
    textWrap: 'wrap',
    testId: 'test-employee-tier',
  },
};

const handleComboboxChange = (key, handler) => (item) => {
  handler({
    key,
    value: item ? item.id : null,
  });
};

const JobKeeperTable = ({
  featureToggles,
  employeeTierOptions,
  employees,
  firstFortnightOptions,
  finalFortnightOptions,
  isTableLoading,
  onEmployeeChange,
  onOpenEmployeeBenefitReport,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.firstName}>
        {tableConfig.firstName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.lastName}>
        {tableConfig.lastName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.firstFortnight}>
        <div>
          {tableConfig.firstFortnight.columnName}
          {featureToggles && featureToggles.isJobKeeper2Enabled && (
            <span testId="test-firstFortnight-tooltip">
              &nbsp;
              <Tooltip triggerContent={<Icons.Info />} placement="top">
                First JobKeeper fortnights will update after the STP report has
                sent.
              </Tooltip>
            </span>
          )}
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.finalFortnight}>
        <div>
          {tableConfig.finalFortnight.columnName}
          {featureToggles && featureToggles.isJobKeeper2Enabled && (
            <span testId="test-finalFortnight-tooltip">
              &nbsp;
              <Tooltip triggerContent={<Icons.Info />} placement="top">
                Final JobKeeper fortnights will update after the STP report has
                sent.
              </Tooltip>
            </span>
          )}
        </div>
      </Table.HeaderItem>
      {featureToggles && featureToggles.isJobKeeper2Enabled && (
        <Table.HeaderItem {...tableConfig.tier}>
          <div>
            {tableConfig.tier.columnName}
            &nbsp;
            <Tooltip triggerContent={<Icons.Info />} placement="top">
              Employee tiers will update after the STP report has sent.
            </Tooltip>
          </div>
        </Table.HeaderItem>
      )}
    </Table.Header>
  );

  const rows = employees.map((row) => (
    <Table.Row key={row.employeeId} rowData={{ id: row.employeeId }}>
      <Table.RowItem {...tableConfig.firstName}>{row.firstName}</Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>{row.lastName}</Table.RowItem>
      <Table.RowItem {...tableConfig.firstFortnight}>
        <JobKeeperFortnightCombobox
          name="firstFortnightCombobox"
          fortnightOptions={firstFortnightOptions}
          label="firstFortnightCombobox"
          hideLabel
          selectedFn={row.firstFortnight}
          allowClear={row.allowClearFirstFortnight}
          onChange={handleComboboxChange('firstFortnight', ({ key, value }) =>
            onEmployeeChange({
              key,
              value,
              rowId: row.employeeId,
            })
          )}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.finalFortnight}>
        <JobKeeperFortnightCombobox
          name="finalFortnightCombobox"
          fortnightOptions={finalFortnightOptions}
          selectedFn={row.finalFortnight}
          label="finalFortnightCombobox"
          hideLabel
          allowClear={row.allowClearFinalFortnight}
          onChange={handleComboboxChange('finalFortnight', ({ key, value }) =>
            onEmployeeChange({
              key,
              value,
              rowId: row.employeeId,
            })
          )}
        />
      </Table.RowItem>
      {featureToggles && featureToggles.isJobKeeper2Enabled && (
        <Table.RowItem {...tableConfig.tier}>
          <EmployeeTierCombobox
            name="employeeTierCombobox"
            employeeTierOptions={employeeTierOptions}
            selectedFn={row.tier}
            label="employeeTierCombobox"
            hideLabel
            allowClear={row.allowClearTier}
            onChange={handleComboboxChange('tier', ({ key, value }) =>
              onEmployeeChange({
                key,
                value,
                rowId: row.employeeId,
              })
            )}
          />
        </Table.RowItem>
      )}
    </Table.Row>
  ));

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={employees.length === 0}
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );

  const cardBody = (
    <>
      <h3 testid="jobKeeperTableHeader">
        Confirm employees eligible for JobKeeper payment
        {featureToggles && featureToggles.isJobKeeperTierSuggestionEnabled && (
          <div className={styles.tierReport}>
            <Button
              id="employee-benefit-report-btn"
              testid="employee-benefit-report-btn"
              onClick={onOpenEmployeeBenefitReport}
              type="link"
              icon={<Icons.GenericDocument />}
              className={styles['jobkeeper-reporting-btn']}
            >
              View JobKeeper tier suggestions (PDF)
            </Button>
          </div>
        )}
      </h3>
      <p></p>
      <p testid="jobKeeperPaymentHeader">
        Only select the first JobKeeper fortnight for eligible employees and
        we&apos;ll send this information to the ATO. When you want to stop
        claiming JobKeeper for an employee, enter a final JobKeeper fortnight,
        and notify the ATO. The final fortnight should be selected as the
        fortnight after the last payment fortnight.
      </p>
      {featureToggles && !featureToggles.isJobKeeper2Enabled && (
        <div testId="test-old-JK-info">
          <p>
            For more information about JobKeeper payments,&nbsp;
            <a
              href="https://www.ato.gov.au/General/JobKeeper-Payment/Employers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              visit the ATO.
            </a>
          </p>
          <div className={styles.info}>
            <Alert type="info">
              JobKeeper fortnights notified to the ATO will update below after
              the STP report has sent.&nbsp;
            </Alert>
          </div>
        </div>
      )}
      {table}
    </>
  );

  return <Card body={cardBody} />;
};

export default JobKeeperTable;
