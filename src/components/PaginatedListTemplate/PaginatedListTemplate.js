import React from 'react';

import LoadMoreButton from './LoadMoreButton';
import StandardTemplate from '../Feelix/StandardTemplate/StandardTemplate';

const PaginatedListTemplate = (props) => {
  const {
    listTable,
    onLoadMoreButtonClick,
    loadMoreButtonStatus,
    className,
    ...rest
  } = props;

  return (
    <div className={className}>
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
