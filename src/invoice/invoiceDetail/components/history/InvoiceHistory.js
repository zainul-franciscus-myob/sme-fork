import {
  Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceHistoryAccordionStatus, getMostRecentStatus } from '../../selectors/invoiceHistorySelectors';
import AccordionTable from '../../../../components/Feelix/Accordion/AccordionTable';
import InvoiceHistoryAccordianStatus from '../../InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatusBadge from './InvoiceHistoryStatusBadge';
import InvoiceHistoryTable from './InvoiceHistoryTable';
import ServiceUnavailableImage from '../ServiceUnavailableImage';
import TableCollapsibleRow from '../../../../components/Feelix/Accordion/TableCollapsibleRow';
import styles from './InvoiceHistory.module.css';

const InvoiceHistory = ({
  invoiceHistoryAccordianStatus, mostRecentStatus,
}) => {
  const unavailableTooltipMessage = 'The activity history is currently unavailable. Please try again later.';

  const getTableHeader = appendToHeader => (
    <Table.Row>
      <Table.RowItem className={styles.header}>
        Activity History
        {appendToHeader}
      </Table.RowItem>
    </Table.Row>
  );

  return {
    [InvoiceHistoryAccordianStatus.LOADING]: (
      <AccordionTable
        expansionToggle
        openPosition={0}
        body={(
          <Table.Body>
            <TableCollapsibleRow header={getTableHeader()}>
              <Spinner size="small" />
            </TableCollapsibleRow>
          </Table.Body>
        )}
      />),
    [InvoiceHistoryAccordianStatus.LOADED]: (
      <AccordionTable
        expansionToggle
        openPosition={0}
        body={(
          <Table.Body>
            <TableCollapsibleRow
              header={getTableHeader(
                <InvoiceHistoryStatusBadge status={mostRecentStatus} />,
              )}
            >
              <InvoiceHistoryTable />
            </TableCollapsibleRow>
          </Table.Body>
        )}
      />),
    [InvoiceHistoryAccordianStatus.UNAVAILABLE]: (
      <AccordionTable
        handleHeaderClick={() => {}}
        body={(
          <Table.Body className={styles.unavailable}>
            <TableCollapsibleRow
              header={getTableHeader(
                <ServiceUnavailableImage tooltipMessage={unavailableTooltipMessage} />,
              )}
            />
          </Table.Body>
        )}
      />
    ),
  }[invoiceHistoryAccordianStatus];
};

const mapStateToProps = state => ({
  mostRecentStatus: getMostRecentStatus(state),
  invoiceHistoryAccordianStatus: getInvoiceHistoryAccordionStatus(state),
});

export default connect(mapStateToProps)(InvoiceHistory);
