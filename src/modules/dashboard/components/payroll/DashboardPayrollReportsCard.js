import { connect } from 'react-redux';
import React from 'react';

import {
  getFavouriteReports,
  getHasError,
  getIsFavouritesShowing,
  getIsLoading,
  getPopularReports,
  getViewAllUrl,
} from '../../selectors/DashboardPayrollReportsSelectors';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardPayrollCard from './DashboardPayrollCard';
import ReportLine from './ReportLine';
import styles from './DashboardPayrollReportsCard.module.css';

const DashboardPayrollReportsCard = ({
  isLoading,
  isFavouritesShowing,
  hasError,
  favouriteReports,
  popularReports,
  viewAllUrl,
  onReload,
}) => {
  const body = (
    <div className={styles.body}>
      <div className={styles.reportsSection}>
      {isFavouritesShowing && (
        <div>
          <h3>Favourites</h3>
          {
            favouriteReports.map(({ name, url }) => (
                <ReportLine isFavourite url={url}>{name}</ReportLine>
            ))
          }
        </div>)}
        <div>
          <h3>Popular</h3>
          {
            popularReports.map(({ name, url }) => (
                <ReportLine url={url}>{name}</ReportLine>
            ))
          }
        </div>
      </div>
      <div className={styles.viewAllSection}>
        <a href={viewAllUrl}>View all</a>
      </div>
    </div>
  );

  const header = (
    <div>
      <DashboardCardHeader title="Reports" />
      <hr />
    </div>
  );

  const view = (
    <>
      {header}
      {body}
    </>
  );

  return <DashboardPayrollCard
    hasError={hasError}
    onReload={onReload}
    isLoading={isLoading}
    view={view}
  />;
};

const mapStateToProps = (state) => ({
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isFavouritesShowing: getIsFavouritesShowing(state),
  favouriteReports: getFavouriteReports(state),
  popularReports: getPopularReports(state),
  viewAllUrl: getViewAllUrl(state),
});

export default connect(mapStateToProps)(DashboardPayrollReportsCard);
