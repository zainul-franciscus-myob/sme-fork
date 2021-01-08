import {
  getBusinessId,
  getEmployeeList,
  getIsTableEmpty,
  getIsTableLoading,
  getLoadingState,
  getPayRunListUrl,
  getPaymentDate,
  getPaymentPeriodEnd,
  getPaymentPeriodStart,
  getRegion,
  getTotalTakeHomePay,
  getUrlParams,
} from '../payRunDetailNzSelector';
import LoadingState from '../../../../../components/PageView/LoadingState';

describe('getUrlParams', () => {
  it('should get URL params', () => {
    const expected = {
      businessId: 'businessId',
      payRunId: 'payRunId',
      region: 'region',
    };

    const state = {
      businessId: 'businessId',
      payRunId: 'payRunId',
      region: 'region',
    };

    expect(getUrlParams(state)).toEqual(expected);
  });
});

describe('getPaymentPeriodStart', () => {
  it('should get period start', () => {
    const expected = 'Tue 01/12/2020';

    const state = {
      paymentPeriodStart: '2020-12-01',
    };

    expect(getPaymentPeriodStart(state)).toEqual(expected);
  });
});

describe('getPaymentPeriodEnd', () => {
  it('should get period end', () => {
    const expected = 'Mon 14/12/2020';

    const state = {
      paymentPeriodEnd: '2020-12-14',
    };

    expect(getPaymentPeriodEnd(state)).toEqual(expected);
  });
});

describe('getPaymentDate', () => {
  it('should get payment date', () => {
    const expected = 'Tue 15/12/2020';

    const state = {
      paymentDate: '2020-12-15',
    };

    expect(getPaymentDate(state)).toEqual(expected);
  });
});

describe('getTotalTakeHomePay', () => {
  it('should get net pay', () => {
    const expected = '15200.36';

    const state = {
      totalTakeHomePay: '15200.36',
    };

    expect(getTotalTakeHomePay(state)).toEqual(expected);
  });
});

describe('getLoadingState', () => {
  it('should get loading state', () => {
    const expected = 'LOADING';

    const state = {
      loadingState: 'LOADING',
    };

    expect(getLoadingState(state)).toEqual(expected);
  });
});

describe('getEmployeeList', () => {
  it('should get employee list', () => {
    const expected = [
      {
        id: '1',
        name: 'John',
      },
      {
        id: '2',
        name: 'James',
      },
    ];

    const state = {
      employeeList: [
        {
          id: '1',
          name: 'John',
        },
        {
          id: '2',
          name: 'James',
        },
      ],
    };

    expect(getEmployeeList(state)).toEqual(expected);
  });
});

describe('getIsTableEmpty', () => {
  it('should be true when employee list is null', () => {
    const state = {};

    expect(getIsTableEmpty(state)).toEqual(true);
  });

  it('should be true when employee list is empty', () => {
    const state = {
      employeeList: [],
    };

    expect(getIsTableEmpty(state)).toEqual(true);
  });

  it('should be false when employee list has any members', () => {
    const state = {
      employeeList: [
        {
          id: '1',
          name: 'John',
        },
        {},
      ],
    };

    expect(getIsTableEmpty(state)).toEqual(false);
  });
});

describe('getIsTableLoading', () => {
  it('should be true if table is loading', () => {
    const state = {
      loadingState: LoadingState.LOADING,
    };

    expect(getIsTableLoading(state)).toEqual(true);
  });

  it('should be false if table is not loading', () => {
    const state = {
      loadingState: LoadingState.LOADING_FAIL,
    };

    expect(getIsTableLoading(state)).toEqual(false);
  });
});

describe('getBusinessId', () => {
  it('should get business Id', () => {
    const expected = '258258';

    const state = {
      businessId: '258258',
    };

    expect(getBusinessId(state)).toEqual(expected);
  });
});

describe('getRegion', () => {
  it('should get region', () => {
    const expected = 'abcd';

    const state = {
      region: 'abcd',
    };

    expect(getRegion(state)).toEqual(expected);
  });
});

describe('getPayRunListUrl', () => {
  it('should get URL of PayRun list view', () => {
    const expected = '/#/abcd/258258/payRun';

    const state = {
      businessId: '258258',
      region: 'abcd',
    };

    expect(getPayRunListUrl(state)).toEqual(expected);
  });
});
