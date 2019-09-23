import {
  Button, ButtonRow, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsLoading } from '../../selectors/superFundListSelectors';
import PageView from '../../../components/PageView/PageView';
import SuperFundListFilterOptions from './SuperFundListFilterOptions';
import SuperFundListTable from './SuperFundListTable';

const SuperFundListView = (props) => {
  const {
    isLoading,
    pageHead,
    alert,
    tabs,
    listeners: {
      onCreateButtonClick,
      onUpdateFilterOptions,
      onApplyFilter,
      onSort,
    },
  } = props;

  const actions = (
    <ButtonRow>
      <Button onClick={onCreateButtonClick}>Create super fund</Button>
    </ButtonRow>
  );

  const subHeadChildren = (
    <React.Fragment>
      { tabs }
      { actions }
    </React.Fragment>
  );

  const filterBar = (
    <SuperFundListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const view = (
    <SuperFundListTable onSort={onSort} />
  );

  return (
    <StandardTemplate
      sticky="none"
      pageHead={pageHead}
      alert={alert}
      subHeadChildren={subHeadChildren}
      filterBar={isLoading ? undefined : filterBar}
    >
      <PageView isLoading={isLoading} view={view} />
    </StandardTemplate>
  );
};

SuperFundListView.defaultProps = {
  alert: undefined,
};

SuperFundListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pageHead: PropTypes.string.isRequired,
  alert: PropTypes.node,
  tabs: PropTypes.node.isRequired,
  listeners: PropTypes.shape({
    onCreateButtonClick: PropTypes.func.isRequired,
    onUpdateFilterOptions: PropTypes.func.isRequired,
    onApplyFilter: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(SuperFundListView);
