import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../findAndRecodeSelectors';
import FindAndRecodeListTableBody from './FindAndRecodeListTableBody';
import NoResultsView from '../../components/NoResultsView';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';

const FindAndRecodeListTable = ({
  onSelectItem,
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
}) => {
  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={<NoResultsView />}
    >
      <FindAndRecodeListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
        onSelectItem={onSelectItem}
      />
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(FindAndRecodeListTable);
