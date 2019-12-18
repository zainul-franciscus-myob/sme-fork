import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFinancialYear,
  getFinancialYearOptions,
  getHasError,
  getIsDisabled,
  getIsLoading,
} from '../../selectors/DashboardTrackingSelectors';
import CardView from '../../../../components/CardView/CardView';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardTrackingDetail from './DashboardTrackingDetail';
import ErrorCard from '../ErrorCard';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './DashboardTrackingCard.module.css';

const DashboardTrackingCard = ({
  hasError,
  isLoading,
  isDisabled,
  financialYear,
  financialYearOptions,
  onChange,
  onReload,
}) => {
  const headerView = (
    <>
      <DashboardCardHeader title="How your business is tracking">
        <Select
          name="financialYear"
          label="Financial year"
          hideLabel
          className={styles.financialYear}
          value={financialYear}
          onChange={handleSelectChange(onChange)}
          disabled={isDisabled}
        >
          {financialYearOptions.map(({ name: label, value }) => (
            <Select.Option key={value} value={value} label={label} />
          ))}
        </Select>
      </DashboardCardHeader>
    </>
  );

  const detailView = <DashboardTrackingDetail />;

  const view = (
    <div>
      {headerView}
      {detailView}
    </div>
  );

  if (hasError) return <ErrorCard onTry={onReload} />;

  return (
    <CardView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isDisabled: getIsDisabled(state),
  financialYear: getFinancialYear(state),
  financialYearOptions: getFinancialYearOptions(state),
});

export default connect(mapStateToProps)(DashboardTrackingCard);
