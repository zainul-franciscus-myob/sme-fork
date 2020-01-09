import { Card } from '@myob/myob-widgets';
import React from 'react';

import styles from './Details.module.css';

const Details = ({ details }) => (
  <Card classes={[styles.container]} body={details} />
);

export default Details;
