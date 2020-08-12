import { FieldGroup, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmailTabEmployees,
  getPrintTabEmployees,
  getSelectedTab,
} from '../payRunDetailSelector';
import EmailPaySlipsTab from './EmailPaySlipsTab';
import PrintPaySlipsTab from './PrintPaySlipsTab';
import ReversedPayRunView from './ReversedPayRunView';

const PayRunEmployees = ({
  setSelectedTab,
  selectedTab,
  emailTabListeners,
  emailTabEmployees,
  printTabListeners,
  printTabEmployees,
  onEmployeeNameClick,
  exportPdf,
  isReversal,
}) => {
  const tabItems = [
    { id: 'email-pay-slips', label: 'Email pay slips' },
    { id: 'print-pay-slips', label: 'Print pay slips' },
  ];

  const tabContent = {
    'email-pay-slips': (
      <EmailPaySlipsTab
        employees={emailTabEmployees}
        selectAll={emailTabListeners.selectAll}
        selectItem={emailTabListeners.selectItem}
        onEmployeeNameClick={onEmployeeNameClick}
        exportPdf={exportPdf}
        onEmailClick={emailTabListeners.onEmailClick}
      />
    ),
    'print-pay-slips': (
      <PrintPaySlipsTab
        employees={printTabEmployees}
        selectAll={printTabListeners.selectAll}
        selectItem={printTabListeners.selectItem}
        onEmployeeNameClick={onEmployeeNameClick}
        exportPdf={exportPdf}
      />
    ),
  }[selectedTab];

  const allEmployees = emailTabEmployees.concat(printTabEmployees);
  const map = new Map();
  const uniqueEmployees = [];

  allEmployees.forEach((employee) => {
    if (!map.has(employee.id)) {
      map.set(employee.id, true);
      uniqueEmployees.push({
        ...employee,
      });
    }
  });

  const reversedPayContent = (
    <ReversedPayRunView
      employees={uniqueEmployees}
      onEmployeeNameClick={onEmployeeNameClick}
    />
  );

  if (isReversal) {
    return (
      <>
        <FieldGroup label="Employees">{reversedPayContent}</FieldGroup>
      </>
    );
  }

  return (
    <>
      <FieldGroup label="Employees">
        <Tabs
          items={tabItems}
          selected={selectedTab}
          onSelected={setSelectedTab}
        />
        {tabContent}
      </FieldGroup>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedTab: getSelectedTab(state),
  emailTabEmployees: getEmailTabEmployees(state),
  printTabEmployees: getPrintTabEmployees(state),
});

export default connect(mapStateToProps)(PayRunEmployees);
