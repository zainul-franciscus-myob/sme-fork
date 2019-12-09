import { FieldGroup, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmailTabEmployees, getPrintTabEmployees, getSelectedTab } from '../PreparePaySlipsSelectors';
import EmailPaySlipsTab from './EmailPaySlipsTab';
import PrintPaySlipsTab from './PrintPaySlipsTab';

const PayRunEmployees = ({
  setSelectedTab,
  selectedTab,
  emailTabListeners,
  emailTabEmployees,
  printTabEmployees,
  exportPdf,
}) => {
  const tabItems = [
    { id: 'email-pay-slips', label: 'Email pay slips' },
    { id: 'print-pay-slips', label: 'Print pay slips' },
  ];

  const tabContent = {
    'email-pay-slips': <EmailPaySlipsTab
      employees={emailTabEmployees}
      selectAll={emailTabListeners.selectAll}
      selectItem={emailTabListeners.selectItem}
      exportPdf={exportPdf}
      onEmailClick={emailTabListeners.onEmailClick}
    />,
    'print-pay-slips': <PrintPaySlipsTab
      employees={printTabEmployees}
      exportPdf={exportPdf}
    />,
  }[selectedTab];

  return (
    <FieldGroup label="Employees">
      <Tabs items={tabItems} selected={selectedTab} onSelected={setSelectedTab} />
      {tabContent}
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  selectedTab: getSelectedTab(state),
  emailTabEmployees: getEmailTabEmployees(state),
  printTabEmployees: getPrintTabEmployees(state),
});

export default connect(mapStateToProps)(PayRunEmployees);
