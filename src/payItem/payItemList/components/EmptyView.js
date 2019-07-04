import React from 'react';

import style from './PayItemListView.css';

const EmptyView = ({ payItem, additionalMessage }) => (
  <div className={style.empty}>
    <div>
      {`You have not created any ${payItem} yet.`}
      <br />
      {`Your ${payItem} will show here once they are created.`}
      <br />
      {additionalMessage}
    </div>
  </div>
);

export default EmptyView;
