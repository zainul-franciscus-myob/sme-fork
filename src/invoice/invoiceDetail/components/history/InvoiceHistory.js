import {
  Label, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceHistoryAccordionStatus, getMostRecentStatus, getMostRecentStatusColor,
} from '../../selectors/invoiceHistorySelectors';
import AccordionTable from '../../../../components/Feelix/Accordion/AccordionTable';
import InvoiceHistoryAccordianStatus from '../../InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatusPretty from '../../InvoiceHistoryStatusPretty';
import InvoiceHistoryTable from './InvoiceHistoryTable';
import ServiceUnavailableImage from '../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import TableCollapsibleRow from '../../../../components/Feelix/Accordion/TableCollapsibleRow';
import styles from './InvoiceHistory.module.css';

const InvoiceHistory = ({
  invoiceHistoryAccordianStatus,
  mostRecentStatus,
  mostRecentStatusColor,
  onAccordionClose,
  onAccordionOpen,
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

  const headerStatusLabel = (
    <div className={styles.headerLabel}>
      <Label color={mostRecentStatusColor} type="boxed">
        {InvoiceHistoryStatusPretty[mostRecentStatus]}
      </Label>
    </div>
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
    [InvoiceHistoryAccordianStatus.OPEN]: (
      <AccordionTable
        handleHeaderClick={onAccordionClose}
        expansionToggle
        openPosition={0}
        body={(
          <Table.Body>
            <TableCollapsibleRow
              header={getTableHeader(headerStatusLabel)}
            >
              <InvoiceHistoryTable />
            </TableCollapsibleRow>
          </Table.Body>
        )}
      />),
    [InvoiceHistoryAccordianStatus.CLOSED]: (
      <AccordionTable
        handleHeaderClick={onAccordionOpen}
        expansionToggle
        openPosition={-1}
        body={(
          <Table.Body>
            <TableCollapsibleRow
              header={getTableHeader(headerStatusLabel)}
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
  mostRecentStatusColor: getMostRecentStatusColor(state),
  invoiceHistoryAccordianStatus: getInvoiceHistoryAccordionStatus(state),
});

export default connect(mapStateToProps)(InvoiceHistory);
