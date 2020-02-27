import sortPayItems from '../sortPayItems';

describe('sortPayItems', () => {
  it('sorts pay items', () => {
    const payItems = [{
      payItemId: '3',
      name: 'B Hourly',
      payBasis: 'Hourly',
    }, {
      payItemId: '1',
      name: 'Base Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '4',
      name: 'A Hourly',
      payBasis: 'Hourly',
    }, {
      payItemId: '5',
      name: 'C Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '6',
      name: 'A Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '7',
      name: 'B Salary',
      payBasis: 'Salary',
    }];
    const baseSalaryWagePayItemId = '1';
    const baseHourlyWagePayItemId = '2';
    const expected = [{
      payItemId: '1',
      name: 'Base Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '4',
      name: 'A Hourly',
      payBasis: 'Hourly',
    }, {
      payItemId: '3',
      name: 'B Hourly',
      payBasis: 'Hourly',
    }, {
      payItemId: '6',
      name: 'A Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '7',
      name: 'B Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '5',
      name: 'C Salary',
      payBasis: 'Salary',
    }];

    const actual = sortPayItems({
      payItems,
      baseSalaryWagePayItemId,
      baseHourlyWagePayItemId,
    });

    expect(actual).toEqual(expected);
  });

  it('does not sort base pay items', () => {
    const payItems = [{
      payItemId: '1',
      name: 'Base Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '4',
      name: 'Base Hourly',
      payBasis: 'Hourly',
    }];
    const baseSalaryWagePayItemId = '1';
    const baseHourlyWagePayItemId = '4';
    const expected = [{
      payItemId: '1',
      name: 'Base Salary',
      payBasis: 'Salary',
    }, {
      payItemId: '4',
      name: 'Base Hourly',
      payBasis: 'Hourly',
    }];

    const actual = sortPayItems({
      payItems,
      baseSalaryWagePayItemId,
      baseHourlyWagePayItemId,
    });

    expect(actual).toEqual(expected);
  });
});
