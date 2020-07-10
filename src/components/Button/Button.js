import { Button as FeelixButton } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

const Button = ({ children, className, ...props }) => (
  <FeelixButton {...props} className={classNames(styles.unwrap, className)}>
    {children}
  </FeelixButton>
);

export default Button;
