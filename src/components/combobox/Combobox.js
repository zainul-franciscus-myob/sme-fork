import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Combobox.module.css';

const Combobox = ({ left, ...props }) => (
  <div className={classNames({
    [styles.left]: left,
  })}
  >
    <FeelixCombobox {...props} />
  </div>
);

export default Combobox;
