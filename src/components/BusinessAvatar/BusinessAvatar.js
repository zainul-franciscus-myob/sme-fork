import React from 'react';
import classnames from 'classnames';

import buildBusinessAbbreviation from './buildBusinessAbbreviation';
import styles from './BusinessAvatar.module.css';

const BusinessAvatar = ({ businessName, className }) => {
  const abbr = buildBusinessAbbreviation(businessName);
  return abbr.length > 0 && <div className={classnames(styles.avatar, className)}>{abbr}</div>;
};

export default BusinessAvatar;
