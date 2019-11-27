import {
  StandardTemplate,
} from '@myob/myob-widgets';
import React from 'react';

import LoadMoreButton from './LoadMoreButton';

const PaginatedListTemplate = (props) => {
  const {
    alertComponent,
    pageHead,
    filterBar,
    tableHeader,
    listTable,
    onLoadMoreButtonClick,
    loadMoreButtonStatus,
  } = props;

  return (
    <div>
      <StandardTemplate
        alert={alertComponent}
        sticky="all"
        pageHead={pageHead}
        filterBar={filterBar}
        tableHeader={tableHeader}
      >
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
