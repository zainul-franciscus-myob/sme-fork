import {
  StandardTemplate,
} from '@myob/myob-widgets';
import React from 'react';

import LoadMoreButton from './LoadMoreButton';

const PaginatedListTemplate = (props) => {
  const {
    listTable,
    onLoadMoreButtonClick,
    loadMoreButtonStatus,
    ...rest
  } = props;

  return (
    <div>
      <StandardTemplate sticky="all" {...rest}>
        {listTable}
      </StandardTemplate>

      <LoadMoreButton
        onLoadMoreButtonClick={onLoadMoreButtonClick}
        loadMoreButtonStatus={loadMoreButtonStatus}
      />
    </div>
  );
};

export default PaginatedListTemplate;
