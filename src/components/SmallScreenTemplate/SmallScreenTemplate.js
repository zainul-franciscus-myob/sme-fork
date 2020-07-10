import { BaseTemplate } from '@myob/myob-widgets';
import React from 'react';

import styles from './SmallScreenTemplate.module.css';

const SmallScreenTemplate = ({ children }) => (
  <BaseTemplate containerClassName={styles.container}>{children}</BaseTemplate>
);

export default SmallScreenTemplate;
