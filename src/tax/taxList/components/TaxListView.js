import { Spinner, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsLoading, getPageHead } from '../taxListSelectors';
import TaxListTable from './TaxListTable';

const TaxListView = ({ isLoading, pageHead }) => (
  isLoading
    ? <Spinner />
    : (
      <StandardTemplate sticky="none" pageHead={pageHead}>
        <TaxListTable />
      </StandardTemplate>
    )
);

TaxListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pageHead: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(TaxListView);
