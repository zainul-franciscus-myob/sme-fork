import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import style from './PayItemListView.css';

const TableSpinner = () => (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

export default TableSpinner;
