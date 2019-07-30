import { getTitle } from '../employmentClassificationDetailSelectors';

describe('EmploymentClassificationDetailSelectors', () => {
  describe('getTitle', () => {
    [
      {
        isCreating: true,
        title: 'Create classification',
      },
      {
        isCreating: false,
        title: 'Edit classification',
      },
    ].forEach((test) => {
      it(`return ${test.title} when isCreating is ${test.isCreating}`, () => {
        const state = {
          employmentClassificationDetail: {
            isCreating: test.isCreating,
          },
        };

        const actual = getTitle(state);

        expect(actual).toEqual(test.title);
      });
    });
  });
});
