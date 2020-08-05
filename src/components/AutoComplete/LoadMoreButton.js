import { Button, Spinner } from '@myob/myob-widgets';
import React from 'react';

import LoadMoreButtonStatus from './LoadMoreButtonStatus';
import style from './LoadMoreButton.module.css';

const LoadMoreButton = ({ loadMoreButtonStatus }) => {
  const spinner = (
    <div className={style.spinner}>
      <Spinner size="small" />
    </div>
  );

  const button = (
    <div className={style.button}>
      <Button key="loadMore" name="loadMore" type="secondary">
        Load more
      </Button>
    </div>
  );

  return {
    [LoadMoreButtonStatus.LOADING]: spinner,
    [LoadMoreButtonStatus.SHOWN]: button,
    [LoadMoreButtonStatus.HIDDEN]: null,
  }[loadMoreButtonStatus];
};

export default LoadMoreButton;
