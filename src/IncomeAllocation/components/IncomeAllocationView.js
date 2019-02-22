import {
  Card, Select, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlert, getEntityTypeOptions, getIsLoading, getIsTableHidden, getSelectedEntityType,
} from '../IncomeAllocationSelectors';
import Alert from '../../components/Alert/Alert';
import IncomeAllocationActions from './IncomeAllocationActions';
import IncomeAllocationTable from './IncomeAllocationTable';
import SimplePageTemplate from '../../components/SimplePageTemplate/SimplePageTemplate';
import styles from './IncomeAllocationView.css';

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

  const view = (
    <div className={styles.incomeAllocation}>
      {alertComponent}
      <SimplePageTemplate pageHead="Income allocation">
        <Card>
          <Select className={styles.select} name="EntityType" label="Entity type" value={selectedEntityType} onChange={onSelectChange(onEntityTypeChange)}>
            {entityTypeOptions.map(({ label, value }) => (
              <Select.Option value={value} label={label} key={value} />
            ))}
          </Select>
          {table}
          <IncomeAllocationActions onSaveButtonClick={onSaveButtonClick} />
        </Card>
      </SimplePageTemplate>
    </div>
  );

  return isLoading ? <Spinner /> : view;
};

IncomeAllocationView.propTypes = {
  selectedEntityType: PropTypes.string.isRequired,
  entityTypeOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  alert: PropTypes.shape({}).isRequired,
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
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(IncomeAllocationView);
