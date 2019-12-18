import {
  Alert, Columns, LineItemTemplate, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlert, getEntityTypeOptions, getIsLoadingState, getIsTableHidden, getSelectedEntityType,
} from '../IncomeAllocationSelectors';
import IncomeAllocationActions from './IncomeAllocationActions';
import IncomeAllocationTable from './IncomeAllocationTable';
import PageView from '../../../components/PageView/PageView';

const onSelectChange = handler => (e) => {
  const { value } = e.target;

  handler(value);
};

const IncomeAllocationView = ({
  isTableHidden,
  isLoading,
  selectedEntityType,
  entityTypeOptions,
  alert,
  onEntityTypeChange,
  onAddRow,
  onRowInputBlur,
  onUpdateRow,
  onRemoveRow,
  onSaveButtonClick,
  onDismissAlert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const table = (
    !isTableHidden && (
      <IncomeAllocationTable
        onAddRow={onAddRow}
        onUpdateRow={onUpdateRow}
        onRowInputBlur={onRowInputBlur}
        onRemoveRow={onRemoveRow}
      />
    )
  );

  const actions = (
    <IncomeAllocationActions onSaveButtonClick={onSaveButtonClick} />
  );

  const options = (
    <Columns type="three">
      <Select name="EntityType" label="Entity type" value={selectedEntityType} onChange={onSelectChange(onEntityTypeChange)}>
        {entityTypeOptions.map(({ label, value }) => (
          <Select.Option value={value} label={label} key={value} />
        ))}
      </Select>
    </Columns>
  );

  const view = (
    <LineItemTemplate
      options={options}
      alert={alertComponent}
      sticky="none"
      actions={actions}
      pageHead="Income allocation"
    >
      {table}
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

IncomeAllocationView.defaultProps = {
  alert: undefined,
};

IncomeAllocationView.propTypes = {
  selectedEntityType: PropTypes.string.isRequired,
  entityTypeOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  alert: PropTypes.shape({}),
  isTableHidden: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEntityTypeChange: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedEntityType: getSelectedEntityType(state),
  entityTypeOptions: getEntityTypeOptions(state),
  isTableHidden: getIsTableHidden(state),
  alert: getAlert(state),
  isLoading: getIsLoadingState(state),
});

export default connect(mapStateToProps)(IncomeAllocationView);
