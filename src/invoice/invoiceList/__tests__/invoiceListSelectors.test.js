import { addDays, subDays } from 'date-fns';

import { getIsDefaultFilters } from '../../../contact/contactList/contactListSelector';
import { getTableEntries, getTotalOverdue } from '../invoiceListSelectors';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

describe('contactListSelector', () => {
  describe('getTableEntries', () => {
    it('returns green status colour when the status is closed', () => {
      const closedState = {
        entries: [{
          status: 'Closed',
        }],
      };
      const expectedStatusColour = 'green';
      const actual = getTableEntries(closedState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns grey status colour when the status is open', () => {
      const openState = {
        entries: [{
          status: 'Open',
        }],
      };
      const expectedStatusColour = 'light-grey';
      const actual = getTableEntries(openState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns red status colour when the status is open and has overdue', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: '06/06/1999',
        }],
      };
      const expectedStatusColour = 'red';
      const actual = getTableEntries(overdueState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns red due date colour when the status is open and has overdue', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: '06/06/1999',
        }],
      };
      const expectedDueDateColour = 'red';
      const actual = getTableEntries(overdueState);

      expect(actual[0].dueDateColor).toEqual(expectedDueDateColour);
    });

    it('returns black due date colour when displayDateDue is COD', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: 'COD',
        }],
      };
      const expectedDueDateColour = 'black';
      const actual = getTableEntries(overdueState);

      expect(actual[0].dueDateColor).toEqual(expectedDueDateColour);
    });
  });

  describe('getIsDefaultFilters', () => {
    it('should retrun false when default filters arent applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'not', type: 'abc' },
        appliedFilterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = false;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
    it('should retrun true when default filters are applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'the same', type: 'abc' },
        appliedFilterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = true;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
  });

  it('getTotalOverdue', () => {
    const today = new Date();
    const state = {
      entries: [
        {
          invoiceDue: 500,
          status: 'Open',
          dateDue: formatIsoDate(addDays(today, 1)),
        },
        {
          invoiceDue: 1000,
          status: 'Open',
          dateDue: formatIsoDate(subDays(today, 1)),
        },
        {
          invoiceDue: 2000,
          status: 'Credit',
          dateDue: formatIsoDate(subDays(today, 1)),
        },
        {
          invoiceDue: 2500,
          status: 'Open',
          dateDue: 'COD',
        },
        {
          invoiceDue: 3000,
          status: 'Open',
          dateDue: 'Prepaid',
        },
      ],
    };

    const actual = getTotalOverdue(state);

    expect(actual).toEqual('$1,000.00');
  });
});
