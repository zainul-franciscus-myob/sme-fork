import { Card } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import style from './FormCard.module.css';

const FormCard = ({
  children,
  ...otherProps
}) => (
  <div className={style.card}>
    <Card {...otherProps}>
      {children}
    </Card>
  </div>
);

FormCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormCard;
