import { addDays, subDays } from 'date-fns';

import { getTableEntries } from '../invoiceListSelectors';

describe('getTableEntries', () => {
  it('returns overdue status when an open invoice due date is in the past', () => {
    const dueDateInPast = subDays(new Date(), 20);
    const overdueState = {
      entries: [{
        status: 'Open',
        dateDue: dueDateInPast,
      }],
    };
    const expectedDisplayStatus = 'Overdue';
    const actual = getTableEntries(overdueState);

    expect(actual[0].displayStatus).toEqual(expectedDisplayStatus);
  });

  it('does not transform open status of an invoice', () => {
    const dueDateInFuture = addDays(new Date(), 20);
    const openState = {
      entries: [{
        status: 'Open',
        dateDue: dueDateInFuture,
      }],
    };
    const expectedDisplayStatus = 'Open';
    const actual = getTableEntries(openState);

    expect(actual[0].displayStatus).toEqual(expectedDisplayStatus);
  });

  it('does not transform closed status', () => {
    const dueDateInFuture = addDays(new Date(), 20);
    const closedState = {
      entries: [{
        status: 'Closed',
        dateDue: dueDateInFuture,
      }],
    };
    const expectedDisplayStatus = 'Closed';
    const actual = getTableEntries(closedState);

    expect(actual[0].displayStatus).toEqual(expectedDisplayStatus);
  });

  it('returns green badge colour when the status is closed', () => {
    const closedState = {
      entries: [{
        status: 'Closed',
      }],
    };
    const expectedBadgeColour = 'green';
    const actual = getTableEntries(closedState);

    expect(actual[0].badgeColour).toEqual(expectedBadgeColour);
  });

  it('returns grey badge colour when the status is open', () => {
    const openState = {
      entries: [{
        status: 'Open',
      }],
    };
    const expectedBadgeColour = 'light-grey';
    const actual = getTableEntries(openState);

    expect(actual[0].badgeColour).toEqual(expectedBadgeColour);
  });

  it('returns red badge colour when the status is overdue', () => {
    const overdueState = {
      entries: [{
        status: 'Overdue',
      }],
    };
    const expectedBadgeColour = 'red';
    const actual = getTableEntries(overdueState);

    expect(actual[0].badgeColour).toEqual(expectedBadgeColour);
  });
});
