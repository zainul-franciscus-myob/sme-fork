import React from 'react';

import CardView from '../../../../components/CardView/CardView';
import ErrorCard from '../ErrorCard';
import styles from './DashboardPayrollCard.module.css';

const DashboardPayrollCard = ({
  hasError,
  isLoading,
  onReload,
  view,
}) => {
  if (hasError) {
    if (hasError) return <ErrorCard onTry={onReload} />;
  }

  return <CardView
    isLoading={isLoading}
    view={view}
    cardBodyClassname={styles.cardbody}
  />;
};

export default DashboardPayrollCard;
