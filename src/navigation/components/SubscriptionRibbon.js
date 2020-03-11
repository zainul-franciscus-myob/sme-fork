import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';

import styles from './SubscriptionRibbon.module.css';

const pluraliseMessage = (daysUntilExpired) => {
  if (Number.isNaN(daysUntilExpired)) return 'You are on a free trial. ';
  if (daysUntilExpired < 0) return 'Your subscription has expired. ';
  if (daysUntilExpired === 1) return 'You have 1 day left in your free trial. ';
  return `You have ${daysUntilExpired} days left in your free trial. `;
};

const telephoneNumber = (region) => {
  if (region === 'au') return '1800 370 612';
  return '0800 60 69 62';
};

const SubscriptionRibbon = ({ trialEndDate, onSubscribeNowClick, region }) => {
  const now = new Date(Date.now());
  const end = typeof trialEndDate === 'string' ? new Date(trialEndDate) : trialEndDate;
  // The trial expiration date in Archie includes a time, which is significant. Other services will
  // take the time into account when determining when the file can be used. Hence we're using
  // `differentInDays()` rather than whole calendar days or anything else. This function is actually
  // pretty nice in that it gives whole day results even across daylight savings boundaries.
  const daysUntilExpired = differenceInDays(end, now);
  return (
    <p className={styles.subscriptionRibbon}>
      {pluraliseMessage(daysUntilExpired)}
      <a href onClick={onSubscribeNowClick} target="_blank" rel="noopener noreferrer">
        <span>Subscribe now</span>
      </a>
      {' '}
      or talk to an expert on
      {' '}
      <a href={`tel:${telephoneNumber(region).replace(/ /g, '')}`} rel="nofollow">
        <span>{telephoneNumber(region)}</span>
      </a>
    </p>
  );
};


export default SubscriptionRibbon;
