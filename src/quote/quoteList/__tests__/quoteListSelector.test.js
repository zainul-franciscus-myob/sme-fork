import { getNewQuoteUrlParam } from '../quoteListSelector';

describe('quoteListSelector', () => {
  describe('getNewQuoteUrlParam', () => {
    [
      {
        layout: 'service',
        urlParam: 'newService',
      },
      {
        layout: 'item',
        urlParam: 'newItem',
      },
    ].forEach((test) => {
      it(`maps ${test.layout} layout to ${test.urlParam} url param for a new quote`, () => {
        const state = {
          layout: test.layout,
        };

        const actual = getNewQuoteUrlParam(state);

        expect(actual).toEqual(test.urlParam);
      });
    });
  });
});
