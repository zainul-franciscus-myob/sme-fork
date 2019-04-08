import {
  Columns, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIsLoading,
} from '../ServiceQuoteSelectors';
import ServiceQuoteOptions from './ServiceQuoteOptions';
import ServiceQuoteTable from './ServiceQuoteTable';

const ServiceQuoteView = ({
  isLoading,
  onUpdateHeaderOptions,
}) => {
  const templateOptions = (
    <Columns type="three">
      <ServiceQuoteOptions
        onUpdateHeaderOptions={onUpdateHeaderOptions}
      />
    </Columns>
  );

  const view = (
    <LineItemTemplate pageHead="Quote" options={templateOptions}>
      <ServiceQuoteTable />
    </LineItemTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

ServiceQuoteView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(ServiceQuoteView);
