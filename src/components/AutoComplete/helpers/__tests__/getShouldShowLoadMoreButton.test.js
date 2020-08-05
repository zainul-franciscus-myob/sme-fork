import LoadMoreButtonStatus from '../../LoadMoreButtonStatus.js';
import getShouldShowLoadMoreButton from '../getShouldShowLoadMoreButton.js';

describe('getShouldShowLoadMoreButton', () => {
  [
    { status: LoadMoreButtonStatus.SHOWN, expected: true },
    { status: LoadMoreButtonStatus.LOADING, expected: true },
    { status: LoadMoreButtonStatus.HIDDEN, expected: false },
  ].forEach(({ status, expected }) => {
    it(`returns ${expected} for status ${status}`, () => {
      const actual = getShouldShowLoadMoreButton(status);
      expect(actual).toEqual(expected);
    });
  });
});
