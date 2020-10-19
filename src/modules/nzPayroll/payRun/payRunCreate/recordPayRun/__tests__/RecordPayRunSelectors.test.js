import getNumberOfSelected from '../RecordPayRunSelectors';

describe('RecordPayRunSelectors', () => {
  describe('getNumberOfSelected', () => {
    it('should get the number of selected employees', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: false,
            },
            {
              isSelected: true,
            },
            {
              isSelected: false,
            },
          ],
        },
      };

      expect(getNumberOfSelected(state)).toEqual(1);
    });
  });
});
