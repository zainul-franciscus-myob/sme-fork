import { Checkbox } from '@myob/myob-widgets';
import React from 'react';

import styles from './ShowInactiveCheckbox.module.css';

const ShowInactiveCheckbox = (props) => {
  const { id, name, label, checked, onChange } = props;

  return (
    <Checkbox
      id={id}
      name={name}
      label={label}
      checked={checked}
      onChange={onChange}
      className={styles.showInactive}
    />
  );
};

export default ShowInactiveCheckbox;
