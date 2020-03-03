import {
  Label, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceHistoryAccordionStatus, getMostRecentStatus, getMostRecentStatusColor,
} from '../../selectors/invoiceHistorySelectors';
import AccordionRowTypes from '../../../../../components/Accordion/AccordionRowTypes';
import AccordionTable from '../../../../../components/Accordion/AccordionTable';
import CollapsibleTableRow from '../../../../../components/Accordion/CollapsibleTableRow';
import InvoiceHistoryAccordianStatus from '../../InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatusPretty from '../../InvoiceHistoryStatusPretty';
import InvoiceHistoryTable from './InvoiceHistoryTable';
import ServiceUnavailableImage from '../../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import styles from './InvoiceHistory.module.css';

const InvoiceHistoryTableRowHeader = ({ children }) => (
  <Table.RowItem>
      Activity history
    {children}
  </Table.RowItem>
);

const InvoiceHistory = ({
  invoiceHistoryAccordianStatus,
  mostRecentStatus,
  mostRecentStatusColor,
  onAccordionClose,
  onAccordionOpen,
  onClickOnRefNo,
}) => {
  const unavailableTooltipMessage = 'The activity history is currently unavailable. Please try again later.';

  const headerStatusLabel = (
    <div className={styles.headerLabel}>
      <Label color={mostRecentStatusColor} type="boxed" size="small">
        {InvoiceHistoryStatusPretty[mostRecentStatus]}
      </Label>
    </div>
  );

  return {
    [InvoiceHistoryAccordianStatus.LOADING]: (
      <AccordionTable
        openPosition={0}
        data={[{}]}
        renderRow={(index, _, buildRowProps) => (
          <CollapsibleTableRow
            {...buildRowProps({
              id: `loading${index}`,
              rowType: AccordionRowTypes.COLLAPSIBLE,
              header: <InvoiceHistoryTableRowHeader />,
              index,
            })}
          >
            <Spinner size="small" />
          </CollapsibleTableRow>
        )}
      />),
    [InvoiceHistoryAccordianStatus.OPEN]: (
      <AccordionTable
        data={[{}]}
        handleHeaderClick={onAccordionClose}
        renderRow={(index, _, buildRowProps) => (
          <CollapsibleTableRow
            {...buildRowProps({
              id: `open${index}`,
              rowType: AccordionRowTypes.COLLAPSIBLE,
              isRowOpen: true,
              header: (
                <InvoiceHistoryTableRowHeader>
                  { headerStatusLabel }
                </InvoiceHistoryTableRowHeader>
              ),
              index,
            })}
          >
            <InvoiceHistoryTable onClickOnRefNo={onClickOnRefNo} />
          </CollapsibleTableRow>
        )}
      />),
    [InvoiceHistoryAccordianStatus.CLOSED]: (
      <AccordionTable
        data={[{}]}
        handleHeaderClick={onAccordionOpen}
        renderRow={(index, _, buildRowProps) => (
          <CollapsibleTableRow
            {...buildRowProps({
              id: `close${index}`,
              rowType: AccordionRowTypes.COLLAPSIBLE,
              isRowOpen: false,
              header: (
                <InvoiceHistoryTableRowHeader>
                  { headerStatusLabel }
                </InvoiceHistoryTableRowHeader>
              ),
              index,
            })}
          >
            <InvoiceHistoryTable onClickOnRefNo={onClickOnRefNo} />
          </CollapsibleTableRow>
        )}
      />),
    [InvoiceHistoryAccordianStatus.UNAVAILABLE]: (
      <AccordionTable
        data={[{}]}
        renderRow={(index, _, buildRowProps) => (
          <CollapsibleTableRow
            {...buildRowProps({
              id: `unavailable${index}`,
              rowType: AccordionRowTypes.NORMAL,
              isRowOpen: false,
              header: (
                <InvoiceHistoryTableRowHeader>
                  <ServiceUnavailableImage tooltipMessage={unavailableTooltipMessage} />
                </InvoiceHistoryTableRowHeader>
              ),
              index,
            })}
          />
        )}
      />),
  }[invoiceHistoryAccordianStatus];
};

const mapStateToProps = state => ({
  mostRecentStatus: getMostRecentStatus(state),
  mostRecentStatusColor: getMostRecentStatusColor(state),
  invoiceHistoryAccordianStatus: getInvoiceHistoryAccordionStatus(state),
});

export default connect(mapStateToProps)(InvoiceHistory);
