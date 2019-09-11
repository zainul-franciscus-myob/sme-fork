import {
  getBillLineByIndex,
  getBillPayload,
  getExpiredDate,
} from '../billItemSelectors';

describe('BillItemSelectors', () => {
  describe('getExpiredDate with term', () => {
    describe('OnADayOfTheMonth', () => {
      it('returns a day of next month when exp days bigger than issue date', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-26',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });

      it('returns a day of current month when exp days smaller than issue date', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-24',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('InAGivenNumberOfDays', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-02-04',
            expirationTerm: 'InAGivenNumberOfDays',
            expirationDays: '27',
          },
        };
        const expected = '03/03/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('DayOfMonthAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-30',
            expirationTerm: 'DayOfMonthAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '31/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('NumberOfDaysAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-30',
            expirationTerm: 'NumberOfDaysAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '01/06/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('Prepaid', () => {
      it('returns issueDate', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-30',
            expirationTerm: 'Prepaid',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('CashOnDelivery', () => {
      it('returns issueDate', () => {
        const expDateState = {
          bill: {
            issueDate: '2019-04-30',
            expirationTerm: 'CashOnDelivery',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });
  });

  describe('getBillPayload', () => {
    it('should add in the supplierName if supplier selected', () => {
      const state = {
        bill: {
          supplierId: '1',
        },
        suppliers: [
          {
            id: '1',
            displayName: 'Cameron James',
          },
        ],
      };
      const actual = getBillPayload(state);
      const expected = {
        supplierId: '1',
        supplierName: 'Cameron James',
      };

      expect(actual).toEqual(expected);
    });

    it('should add a blank supplierName if supplier not selected', () => {
      const state = {
        bill: {
          supplierId: '',
        },
        suppliers: [
          {
            id: '1',
            displayName: 'Cameron James',
          },
        ],
      };
      const actual = getBillPayload(state);
      const expected = {
        supplierId: '',
        supplierName: '',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getBillLineByIndex', () => {
    it('get existing line', () => {
      const state = {
        bill: {
          lines: ['test'],
        },
      };
      const index = 0;

      const actual = getBillLineByIndex(state, { index });

      expect(actual).toEqual(state.bill.lines[index]);
    });

    it('should get a new line when line does not exist', () => {
      const state = {
        bill: {
          lines: [],
        },
        newLine: 'newLine',
      };

      const actual = getBillLineByIndex(state, { index: 0 });

      expect(actual).toEqual(state.newLine);
    });
  });
});
