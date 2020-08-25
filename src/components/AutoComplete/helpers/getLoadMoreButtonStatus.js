import LoadMoreButtonStatus from '../LoadMoreButtonStatus';

const getLoadMoreButtonStatus = (isLoading, hasMore) => {
  if (isLoading) {
    return LoadMoreButtonStatus.LOADING;
  }

  if (hasMore) {
    return LoadMoreButtonStatus.SHOWN;
  }

  return LoadMoreButtonStatus.HIDDEN;
};

export default getLoadMoreButtonStatus;
