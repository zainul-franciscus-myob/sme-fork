import { StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState, getPageHead } from '../taxListSelectors';
import PageView from '../../../../components/PageView/PageView';
import TaxListTable from './TaxListTable';

const TaxListView = ({ loadingState, pageHead }) => {
  const view = (
    <StandardTemplate sticky="none" pageHead={pageHead}>
      <TaxListTable />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(TaxListView);
