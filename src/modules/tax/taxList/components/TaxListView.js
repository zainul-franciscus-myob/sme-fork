import { StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLoading, getPageHead } from '../taxListSelectors';
import PageView from '../../../../components/PageView/PageView';
import TaxListTable from './TaxListTable';

const TaxListView = ({ isLoading, pageHead }) => {
  const view = (
    <StandardTemplate sticky="none" pageHead={pageHead}>
      <TaxListTable />
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(TaxListView);
