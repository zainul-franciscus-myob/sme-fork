import LoadMoreButtonStatus from '../LoadMoreButtonStatus';

const getShouldShowLoadMoreButton = (loadMoreButtonStatus) => {
  return loadMoreButtonStatus !== LoadMoreButtonStatus.HIDDEN;
};

export default getShouldShowLoadMoreButton;
