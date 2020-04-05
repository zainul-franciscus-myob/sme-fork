import {
  Button,
  Spinner,
} from '@myob/myob-widgets';
import React from 'react';

import LoadMoreButtonStatuses from './LoadMoreButtonStatuses';
import style from './LoadMoreButton.module.css';


const LoadMoreButton = (props) => {
  const {
    onLoadMoreButtonClick, loadMoreButtonStatus,
  } = props;

  const spinner = (<div className={style.button}><Spinner size="small" /></div>);

  const button = (
    <div className={style.button}>
      <Button key="loadMore" name="loadMore" type="secondary" onClick={onLoadMoreButtonClick}>
            Load more
      </Button>
    </div>
  );

  return {
    [LoadMoreButtonStatuses.LOADING]: spinner,
    [LoadMoreButtonStatuses.SHOWN]: button,
    [LoadMoreButtonStatuses.HIDDEN]: null,
  }[loadMoreButtonStatus];
};

export default LoadMoreButton;
