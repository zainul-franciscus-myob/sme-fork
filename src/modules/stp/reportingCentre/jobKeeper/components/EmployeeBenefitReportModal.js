import {
  Alert,
  Button,
  Checkbox,
  Modal,
  Separator,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getEmployees,
  getLoadingState,
  isEmployeeBenefitReportModalOpen,
} from '../JobKeeperSelector';
import LoadingState from '../../../../../components/PageView/LoadingState';
import PageView from '../../../../../components/PageView/PageView';
import TableView from '../../../../../components/TableView/TableView';
import styles from './JobKeeperView.module.css';

const EmployeeBenefitReportModal = ({
  onCloseModal,
  employees,
  onSelectEmployee,
  onSelectAllEmployees,
  onViewReport,
  alertMessage,
  isOpen,
  loadingState,
}) => {
  const alertView = alertMessage && <Alert type="danger">{alertMessage}</Alert>;
  const selectedCount = employees.filter((e) => e.isSelected).length;

  const tableConfig = {
    checkbox: {
      columnName: '',
      width: '3.5rem',
      cellRole: 'checkbox',
      valign: 'middle',
    },
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
  };

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="bulk-select"
          label="Bulk select"
          hideLabel
          onChange={(e) => onSelectAllEmployees(e.target.checked)}
          checked={employees.length !== 0 && selectedCount === employees.length}
          indeterminate={
            selectedCount > 0 && selectedCount !== employees.length
          }
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.firstName}>
        {tableConfig.firstName.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.lastName}>
        {tableConfig.lastName.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map((employee) => (
    <Table.Row key={employee.employeeId}>
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={`${employee.employeeId}-select`}
          label={`Select row ${employee.employeeId}`}
          hideLabel
          onChange={(e) => onSelectEmployee(employee, e.target.checked)}
          checked={employee.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.firstName}>
        {employee.firstName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.lastName}>
        {employee.lastName}
      </Table.RowItem>
    </Table.Row>
  ));
  const view = (
    <>
      <Modal.Body className={styles.employeeBenefitReportModalBody}>
        {alertView}
        <p>{selectedCount} employees selected</p>
        <Separator />
        <TableView
          header={header}
          isLoading={getLoadingState === LoadingState.LOADING}
          isEmpty={employees.length === 0}
          testid="finalisationEmployeesTable"
        >
          <Table.Body>{rows}</Table.Body>
        </TableView>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          testid="cancel-employee-benefit-modal-btn"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          testid="get-employee-benefit-report-btn"
          onClick={onViewReport}
        >
          View Report
        </Button>
      </Modal.Footer>
    </>
  );

  return isOpen ? (
    <Modal title="Select employees for report" onCancel={onCloseModal}>
      <PageView isLoading={loadingState === LoadingState.LOADING} view={view} />
    </Modal>
  ) : null;
};

const mapStateToProps = (state) => ({
  isOpen: isEmployeeBenefitReportModalOpen(state),
  loadingState: getLoadingState(state),
  employees: getEmployees(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(EmployeeBenefitReportModal);
