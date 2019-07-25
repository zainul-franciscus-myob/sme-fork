import {
  Button, ButtonRow, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsLoading } from '../../selectors/employmentClassificationListSelectors';
import EmploymentClassificationListFilterOptions from './EmploymentClassificationListFilterOptions';
import EmploymentClassificationListTable from './EmploymentClassificationListTable';
import styles from './EmploymentClassificationListView.module.css';

const EmploymentClassificationListView = (props) => {
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

  const spinner = (
    <div className={styles.contentSpinner}>
      <Spinner />
    </div>
  );

  const actions = (
    <ButtonRow>
      <Button onClick={onCreateButtonClick}>Create classification</Button>
    </ButtonRow>
  );

  const subHeadChildren = (
    <React.Fragment>
      { tabs }
      { actions }
    </React.Fragment>
  );

  const filterBar = (
    <EmploymentClassificationListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const view = (
    <EmploymentClassificationListTable onSort={onSort} />
  );

  return (
    <StandardTemplate
      sticky="none"
      pageHead={pageHead}
      alert={alert}
      subHeadChildren={subHeadChildren}
      filterBar={isLoading ? undefined : filterBar}
    >
      { isLoading ? spinner : view }
    </StandardTemplate>
  );
};

EmploymentClassificationListView.defaultProps = {
  alert: undefined,
};

EmploymentClassificationListView.propTypes = {
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

export default connect(mapStateToProps)(EmploymentClassificationListView);
