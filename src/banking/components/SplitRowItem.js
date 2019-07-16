import { Table } from '@myob/myob-widgets';
import React from 'react';

import style from './BankingView.module.css';

const SplitRowItem = ({ entry, onClick, ...props }) => (
  <Table.RowItem {...props}>
    <div className={style.splitButton}>
      <button type="button" className={`btn btn-link ${style.allocateButton}`} onClick={onClick}>
        <div className="btn-link__container">
          <span className="btn-link__content" title={entry.allocateOrMatch}>
            {entry.allocateOrMatch}
          </span>
        </div>
      </button>
    </div>
  </Table.RowItem>
);

export default SplitRowItem;
