import { Card } from '@myob/myob-widgets';
import React from 'react';

import style from './FormCard.module.css';

const FormCard = ({ children, ...otherProps }) => (
  <div className={style.card}>
    <Card {...otherProps}>{children}</Card>
  </div>
);

export default FormCard;
