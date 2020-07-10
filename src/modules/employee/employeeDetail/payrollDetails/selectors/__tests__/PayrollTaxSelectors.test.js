import {
  getFilteredTaxPayItemOptions,
  getHasTfn,
  getIsTfnEditable,
  getSelectedTaxPayItems,
  getTfn,
} from '../PayrollTaxSelectors';

describe('PayrollTaxSelectors', () => {
  describe('getFilteredTaxPayItemOptions', () => {
    it('should not contain pay item that has already been added to pay item list', () => {
      const payItemOptions = [{ id: '1' }, { id: '2' }];
      const payItems = [{ id: '1' }];

      const actual = getFilteredTaxPayItemOptions.resultFunc(
        payItemOptions,
        payItems
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeTruthy();
    });
  });

  describe('getSelectedTaxPayItems', () => {
    it('get selected tax pay items', () => {
      const payItemOptions = [
        { id: '1', name: 'name1', type: 'TaxPayrollCategory' },
        { id: '2', name: 'name2', type: 'TaxPayrollCategory' },
      ];
      const payItems = [{ id: '1', type: 'TaxPayrollCategory' }];

      const expected = [{ id: '1', name: 'name1', type: 'TaxPayrollCategory' }];

      const actual = getSelectedTaxPayItems.resultFunc(
        payItemOptions,
        payItems
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('getTfnIsEditable', () => {
    const taxFileNumberStates = {
      hasTfn: {
        tfn: '',
        tfnEditable: true,
        hasTfn: true,
      },
      waitingOnTfn: {
        tfn: '111 111 111',
        tfnEditable: false,
        hasTfn: false,
      },
    };

    it('returns true when selected Tfn Status is hasTfn', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStatus: 'hasTfn',
            taxFileNumberStates,
          },
        },
      };

      const result = getIsTfnEditable(state);

      expect(result).toEqual(true);
    });

    it('returns false when selected Tfn Status is waitingOnTfn', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStatus: 'waitingOnTfn',
            taxFileNumberStates,
          },
        },
      };

      const result = getIsTfnEditable(state);

      expect(result).toEqual(false);
    });

    it('returns false when taxFileNumberStatus is undefined', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStates,
          },
        },
      };

      const result = getIsTfnEditable(state);

      expect(result).toEqual(false);
    });

    it('returns false when taxFileNumberStates does not contain taxFileNumberStatus', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStatus: 'somethingElse',
            taxFileNumberStates,
          },
        },
      };

      const result = getIsTfnEditable(state);

      expect(result).toEqual(false);
    });
  });

  describe('getTfn', () => {
    const state = {
      payrollDetails: {
        tax: {
          taxFileNumberStates: {
            hasTfn: {
              tfn: '',
              tfnEditable: true,
              hasTfn: true,
            },
            under18: {
              tfn: '111 111 111',
              tfnEditable: false,
              hasTfn: false,
            },
          },
        },
      },
    };

    it('returns the tfn for the given status', () => {
      const result = getTfn(state, 'under18');

      expect(result).toEqual('111 111 111');
    });

    it('returns empty string if the status is not in states', () => {
      const result = getTfn(state, 'missingState');

      expect(result).toEqual('');
    });
  });

  describe('getHasTfn', () => {
    const taxFileNumberStates = {
      hasTfn: {
        tfn: '',
        tfnEditable: true,
        hasTfn: true,
      },
      under18: {
        tfn: '111 111 111',
        tfnEditable: false,
        hasTfn: false,
      },
    };

    it('returns true when taxFileNumberState is hasTfn', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStates,
            taxFileNumberStatus: 'hasTfn',
          },
        },
      };

      const result = getHasTfn(state);

      expect(result).toEqual(true);
    });

    it('returns false when taxFileNumberState is under18', () => {
      const state = {
        payrollDetails: {
          tax: {
            taxFileNumberStates,
            taxFileNumberStatus: 'under18',
          },
        },
      };

      const result = getHasTfn(state);

      expect(result).toEqual(false);
    });
  });
});
