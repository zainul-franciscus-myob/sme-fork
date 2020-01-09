import { getEmployeePageUrl, getPayItemPageUrl } from '../stpErrorsSelectors';

describe('getEmployeePageUrl', () => {
  it('returns expected url', () => {
    const employeeId = 456;
    const state = {
      businessId: 123,
      region: 'au',
    };

    const url = getEmployeePageUrl(state, employeeId);

    expect(url).toEqual('/#/au/123/employee/456');
  });
});

describe('getPayItemPageUrl', () => {
  it('returns expected url', () => {
    const state = {
      businessId: 123,
      region: 'au',
    };
    const itemType = 'wages';
    const id = 456;

    const url = getPayItemPageUrl(state, itemType, id);

    expect(url).toEqual('/#/au/123/payItem/wages/456');
  });
});
