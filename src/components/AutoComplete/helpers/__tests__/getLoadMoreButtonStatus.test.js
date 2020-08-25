import LoadMoreButtonStatus from '../../LoadMoreButtonStatus';
import getLoadMoreButtonStatus from '../getLoadMoreButtonStatus';

describe('getLoadMoreButtonStatus', () => {
  it('returns the LOADING status if is loading', () => {
    const isLoading = true;
    const actual = getLoadMoreButtonStatus(isLoading);
    expect(actual).toEqual(LoadMoreButtonStatus.LOADING);
  });

  it('returns the SHOWN status if is not loading and has more entries', () => {
    const isLoading = false;
    const hasMore = true;

    const actual = getLoadMoreButtonStatus(isLoading, hasMore);
    expect(actual).toEqual(LoadMoreButtonStatus.SHOWN);
  });

  it('returns the SHOWN status if is not loading and and there are no more entries to be loaded', () => {
    const isLoading = false;
    const hasMore = false;

    const actual = getLoadMoreButtonStatus(isLoading, hasMore);
    expect(actual).toEqual(LoadMoreButtonStatus.HIDDEN);
  });
});
