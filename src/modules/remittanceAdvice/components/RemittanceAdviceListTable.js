import { Card, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../selectors/remittanceAdviceListSelectors';
import Icon from '../../../components/Icon/Icon';
import RemittanceAdviceListTableBody from './RemittanceAdviceListTableBody';
import RemittanceAdviceListTableHeader from './RemittanceAdviceListTableHeader';
import TableView from '../../../components/TableView/TableView';

const paymentDate = 'Payment Date';
const referenceNumber = 'Reference no.';
const supplier = 'Supplier';
const emailAddress = 'Email';
const amountPaid = 'Amount paid ($)';

const responsiveWidths = [
  {
    'min-width': '768px',
    config: [
      { columnName: paymentDate, styles: { width: 'flex-1' } },
      { columnName: referenceNumber, styles: { width: 'flex-1' } },
      { columnName: supplier, styles: { width: 'flex-2' } },
      { columnName: emailAddress, styles: { width: 'flex-1' } },
      { columnName: amountPaid, styles: { width: 'flex-1' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: paymentDate, styles: { width: '15rem' } },
      { columnName: referenceNumber, styles: { width: '15rem' } },
      { columnName: supplier, styles: { width: 'flex-1' } },
      { columnName: emailAddress, styles: { width: '22.9rem' } },
      { columnName: amountPaid, styles: { width: '15rem' } },
    ],
  },
];

const tableConfig = {
  checkbox: { width: 'auto', cellRole: 'checkbox', valign: 'middle' },
  paymentDate: { columnName: paymentDate, styles: { align: 'left' } },
  referenceNumber: { columnName: referenceNumber, styles: { align: 'left' } },
  supplier: { columnName: supplier, styles: { align: 'left' } },
  emailAddress: { columnName: emailAddress, styles: { align: 'left' } },
  amountPaid: { columnName: amountPaid, styles: { align: 'right' } },
};

const RemittanceAdviceListTable = ({
  isTableLoading,
  isTableEmpty,
  onSelectAllRemittanceAdviceList,
  onSelectRemittanceAdvice,
  onSort,
  order,
}) => {
  const noResultImage = <Icon.NoResultState alt="No result found" />;
  const emptyView = (
    <PageState
      title="You have no remittance advices"
      description="Remittance advices will display once payments are made"
      image={noResultImage}
    />
  );

  return (
    <Card>
      <TableView
        isLoading={isTableLoading}
        isEmpty={isTableEmpty}
        emptyView={emptyView}
        header={
          <RemittanceAdviceListTableHeader
            tableConfig={tableConfig}
            onSelectAllRemittanceAdviceList={onSelectAllRemittanceAdviceList}
            onSort={onSort}
            order={order}
          />
        }
        responsiveWidths={responsiveWidths}
        hasActions
        // This prop is necessary to enable certain styling for the Table component in mobile view
        // for when the table has a checkbox/radio button, or any actionable item for each row.
        onRowSelect={() => {}}
      >
        <RemittanceAdviceListTableBody
          tableConfig={tableConfig}
          onSelectRemittanceAdvice={onSelectRemittanceAdvice}
        />
      </TableView>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(RemittanceAdviceListTable);
