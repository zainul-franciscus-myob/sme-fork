import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getMostRecentStatus,
  getMostRecentStatusColor,
  getQuoteHistoryAccordionStatus,
} from '../../selectors/QuoteHistorySelectors';
import AccordionRowTypes from '../../../../../components/Accordion/AccordionRowTypes';
import AccordionTable from '../../../../../components/Accordion/AccordionTable';
import CollapsibleTableRow from '../../../../../components/Accordion/CollapsibleTableRow';
import QuoteHistoryAccordionStatus from '../../types/QuoteHistoryAccordionStatus';
import QuoteHistoryStatusPretty from '../../types/QuoteHistoryStatusPretty';
import QuoteHistoryTable from './QuoteHistoryTable';
import styles from './QuoteHistory.module.css';

const QuoteHistoryTableRowHeader = ({ children }) => (
  <Table.RowItem>
    Activity history
    {children}
  </Table.RowItem>
);

const QuoteHistory = ({
  mostRecentStatusColor,
  mostRecentStatus,
  quoteHistoryAccordionStatus,
  onAccordionToggle,
}) => {
  const headerStatusLabel = (
    <div className={styles.headerLabel}>
      <Label color={mostRecentStatusColor} type="boxed" size="small">
        {QuoteHistoryStatusPretty[mostRecentStatus]}
      </Label>
    </div>
  );

  return (
    <AccordionTable
      data={[{}]}
      handleHeaderClick={onAccordionToggle}
      renderRow={(index, _, buildRowProps) => (
        <CollapsibleTableRow
          {...buildRowProps({
            id: `${quoteHistoryAccordionStatus.toLowerCase()}_${mostRecentStatus}${index}`,
            rowType: AccordionRowTypes.COLLAPSIBLE,
            isRowOpen:
              quoteHistoryAccordionStatus === QuoteHistoryAccordionStatus.OPEN,
            header: (
              <QuoteHistoryTableRowHeader>
                {headerStatusLabel}
              </QuoteHistoryTableRowHeader>
            ),
            index,
          })}
        >
          <QuoteHistoryTable />
        </CollapsibleTableRow>
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  mostRecentStatus: getMostRecentStatus(state),
  mostRecentStatusColor: getMostRecentStatusColor(state),
  quoteHistoryAccordionStatus: getQuoteHistoryAccordionStatus(state),
});

export default connect(mapStateToProps)(QuoteHistory);
