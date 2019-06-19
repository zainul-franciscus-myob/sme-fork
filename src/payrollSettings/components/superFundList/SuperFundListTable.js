import {
  HeaderSort, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../../selectors/superFundListSelectors';
import SuperFundListTableBody from './SuperFundListTableBody';
import styles from './SuperFundListView.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'top' },
  fundId: { width: 'flex-1', valign: 'top' },
  fundName: { width: 'flex-1', valign: 'top' },
};

const emptyView = (
  <div className={styles.empty}>
    <p>You have not created any super funds yet.</p>
    <p>
      Your super funds will show here once they created.
      You also need to sign up for Pay Super so you can pay
      super directly from MYOB.
    </p>
  </div>
);

const spinnerView = (
  <div className={styles.spinner}>
    <Spinner size="medium" />
  </div>
);

const SuperFundListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    order,
    onSort,
  } = props;

  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = spinnerView;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = (<SuperFundListTableBody tableConfig={tableConfig} />);
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.fundId}>
          <HeaderSort title="SPIN or USI" sortName="SuperProductId" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.fundName}>
          <HeaderSort title="Fund name" sortName="SuperProductName" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {tableBodyView}
    </Table>
  );
};

SuperFundListTable.propTypes = {
  isTableLoading: PropTypes.bool.isRequired,
  isTableEmpty: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(SuperFundListTable);
