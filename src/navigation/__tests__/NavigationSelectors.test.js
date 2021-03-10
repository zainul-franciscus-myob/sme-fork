import {
  getBankingUrls,
  getIsNzPayrollOnly,
  getMenuLogoUrl,
  getOnlineTaxLabel,
  getPurchasesUrls,
  getSalesUrls,
  getShouldDisplayAccountingMenu,
  getShouldDisplayAccountingTaxMenuItem,
  getShouldDisplayOnlineTaxMenuItem,
  getShouldDisplayPayrollMenu,
  getShouldDisplayPayrollNzMenu,
  getShouldDisplaySubscriptionNow,
  getShowUrls,
  noOpRouteNames,
} from '../NavigationSelectors';
import RouteName from '../../router/RouteName';

describe('NavigationSelectors', () => {
  describe('getShowUrls', () => {
    it('should return false if the current route is the link user page', () => {
      const state = {
        currentRouteName: RouteName.LINK_USER,
      };
      const actual = getShowUrls(state);
      expect(actual).toEqual(false);
    });

    it('should return false if the current route is the business list page', () => {
      const state = {
        currentRouteName: RouteName.BUSINESS_LIST,
      };
      const actual = getShowUrls(state);
      expect(actual).toEqual(false);
    });

    it('should return true if the current route is any other page', () => {
      const routes = Object.values(RouteName).filter(
        (route) =>
          route !== RouteName.BUSINESS_LIST && route !== RouteName.LINK_USER
      );
      routes.forEach((route) => {
        const state = {
          currentRouteName: route,
        };

        const actual = getShowUrls(state);
        expect(actual).toEqual(true);
      });
    });
  });

  describe('getEnabledUrls', () => {
    it('should not build enabled urls if urls are empty', () => {
      const state = {
        routeParams: {
          businessId: '',
          region: '',
        },
        enabledFeatures: ['reportsSomething'],
        currentRouteName: noOpRouteNames[0],
      };

      const actual = getSalesUrls(state);

      Object.keys(actual).forEach((key) => {
        expect(actual[key]).toEqual(undefined);
      });
    });

    it('should not return purchase order list url if feature toggle is off', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isPurchaseOrderEnabled: false,
        enabledFeatures: ['purchaseOrderList'],
        urls: { purchaseOrderList: 'some-url' },
        currentRouteName: 'purchaseOrder/purchaseOrderList',
      };

      const actual = getPurchasesUrls(state);
      expect(actual.purchaseOrderList).toBeUndefined();
    });

    it('should return purchase order list url if feature toggle is on and feature is returned as enabled from bff', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isPurchaseOrderEnabled: true,
        enabledFeatures: ['purchaseOrderList'],
        urls: { purchaseOrderList: 'some-url' },
        currentRouteName: 'purchaseOrder/purchaseOrderList',
      };

      const actual = getPurchasesUrls(state);
      expect(actual.purchaseOrderList).toBeDefined();
    });

    it('should not return recurring transaction sales list url if feature toggle is off', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: false,
        enabledFeatures: ['recurringTransactionSalesList'],
        urls: { recurringTransactionSalesList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getSalesUrls(state);
      expect(actual.recurringTransactionSalesList).toBeUndefined();
    });

    it('should return recurring transaction sales list url if feature toggle is on and feature is returned as enabled from bff', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: true,
        enabledFeatures: ['recurringTransactionSalesList'],
        urls: { recurringTransactionSalesList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getSalesUrls(state);
      expect(actual.recurringTransactionSalesList).toBeDefined();
    });

    it('should not return recurring transaction purchase list url if feature toggle is off', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: false,
        enabledFeatures: ['recurringTransactionPurchaseList'],
        urls: { recurringTransactionPurchaseList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getPurchasesUrls(state);
      expect(actual.recurringTransactionPurchaseList).toBeUndefined();
    });

    it('should return recurring transaction purchase list url if feature toggle is on and feature is returned as enabled from bff', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: true,
        enabledFeatures: ['recurringTransactionPurchaseList'],
        urls: { recurringTransactionPurchaseList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getPurchasesUrls(state);
      expect(actual.recurringTransactionPurchaseList).toBeDefined();
    });

    it('should not return recurring transaction banking list url if feature toggle is off', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: false,
        enabledFeatures: ['recurringTransactionBankingList'],
        urls: { recurringTransactionBankingList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getBankingUrls(state);
      expect(actual.recurringTransactionBankingList).toBeUndefined();
    });

    it('should return recurring transaction banking list url if feature toggle is on and feature is returned as enabled from bff', () => {
      const state = {
        routeParams: {
          businessId: '1',
          region: 'au',
        },
        isRecurringTransactionEnabled: true,
        enabledFeatures: ['recurringTransactionBankingList'],
        urls: { recurringTransactionBankingList: 'some-url' },
        currentRouteName: 'bill/billList',
      };

      const actual = getBankingUrls(state);
      expect(actual.recurringTransactionBankingList).toBeDefined();
    });
  });

  describe('getMenuLogoUrl', () => {
    it('should return current url if current route name is no op', () => {
      const state = {
        currentRouteName: noOpRouteNames[0],
        routeParams: {
          businessId: 'businessId',
          region: 'au',
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(currentUrl);
    });

    it('should return dashboardUrl if current route name is operational', () => {
      const businessId = 'businessId';
      const currentRouteName = 'bills';
      const state = {
        currentRouteName,
        routeParams: {
          businessId,
          region: 'au',
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(`#/au/${businessId}/dashboard`);
    });

    it('should return nz url if in nz region', () => {
      const businessId = 'businessId';
      const currentRouteName = 'bills';
      const state = {
        currentRouteName,
        routeParams: {
          businessId,
          region: 'nz',
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(`#/nz/${businessId}/dashboard`);
    });
  });

  describe('shouldDisplaySubscriptionNow', () => {
    const state = {
      routeParams: {
        businessId: '🍟',
      },
      trialEndDate: '2020-02-02',
    };

    it('true when is a trial business', () => {
      const actual = getShouldDisplaySubscriptionNow(state);

      expect(actual).toEqual(true);
    });

    [
      {
        name: 'no businessId',
        state: {
          ...state,
          routeParams: {
            businessId: undefined,
          },
        },
      },
      {
        name: 'no trial end date',
        state: {
          ...state,
          trialEndDate: undefined,
        },
      },
    ].forEach((test) => {
      it(`false when ${test.name}`, () => {
        const actual = getShouldDisplaySubscriptionNow(test.state);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('getShouldDisplayPayrollNzMenu', () => {
    const state = {
      routeParams: {
        region: 'nz',
      },
      enabledFeatures: ['employeeListNz'],
      urls: { employeeListNz: 'employee' },
    };

    it('true when region is nz', () => {
      const actual = getShouldDisplayPayrollNzMenu(state);
      expect(actual).toEqual(true);
    });

    it('false when region is not nz', () => {
      const updatedState = {
        ...state,
        routeParams: { region: '🇦🇺' },
      };
      const actual = getShouldDisplayPayrollNzMenu(updatedState);
      expect(actual).toEqual(false);
    });
  });

  describe('getShouldDisplayAccountingMenu', () => {
    const state = {
      routeParams: {
        region: 'au',
      },
      enabledFeatures: ['generalJournalCreate'],
      urls: {
        generalJournalCreate: 'general-journal-create',
      },
      isLoading: false,
    };

    it('returns true when region is au', () => {
      const actual = getShouldDisplayAccountingMenu(state);
      expect(actual).toEqual(true);
    });

    describe.each([[true], [false]])(
      'for nz region when isNzPayrollAccountingEnabled: %s',
      (isNzPayrollAccountingEnabled) => {
        it('returns true when user is not a payroll user', () => {
          const updatedState = {
            ...state,
            isNzPayrollAccountingEnabled,
            routeParams: { region: 'nz' },
            enabledFeatures: ['generalJournalCreate'],
            urls: {
              generalJournalCreate: 'general-journal-create',
            },
          };
          const actual = getShouldDisplayAccountingMenu(updatedState);
          expect(actual).toEqual(true);
        });

        it(`returns ${isNzPayrollAccountingEnabled} when user is a payroll user`, () => {
          const updatedState = {
            ...state,
            isNzPayrollAccountingEnabled,
            routeParams: { region: 'nz' },
            enabledFeatures: ['payRunCreateNz', 'generalJournalCreate'],
            urls: {
              generalJournalCreate: 'general-journal-create',
              payRunCreateNz: 'pay-Run-Create-Nz',
            },
          };
          const actual = getShouldDisplayAccountingMenu(updatedState);
          expect(actual).toEqual(isNzPayrollAccountingEnabled);
        });
      }
    );
  });

  describe('getShouldDisplayPayrollMenu', () => {
    const state = {
      routeParams: {
        region: 'au',
      },
      enabledFeatures: ['employeeList'],
      urls: { employeeList: 'employee' },
    };

    it('true when region is au', () => {
      const actual = getShouldDisplayPayrollMenu(state);
      expect(actual).toEqual(true);
    });

    it('false when region is not au', () => {
      const updatedState = {
        ...state,
        routeParams: { region: '' },
      };

      const actual = getShouldDisplayPayrollMenu(updatedState);
      expect(actual).toEqual(false);
    });
  });

  describe('getIsNzPayrollOnly', () => {
    const state = {
      routeParams: {
        region: 'au',
      },
      enabledFeatures: ['employeeList'],
      urls: { employeeList: 'employee' },
    };

    it('false when region is au', () => {
      const actual = getIsNzPayrollOnly(state);
      expect(actual).toEqual(false);
    });

    it('false when banking is available', () => {
      const updatedState = {
        ...state,
        routeParams: {
          region: 'nz',
        },
        enabledFeatures: ['bankTransactionList', 'employeeListNz'],
        urls: {
          bankTransactionList: 'banking transaction list',
          employeeListNz: 'employee',
        },
      };

      const actual = getIsNzPayrollOnly(updatedState);
      expect(actual).toEqual(false);
    });

    it('true when only payroll is available', () => {
      const updatedState = {
        ...state,
        routeParams: {
          region: 'nz',
        },
        enabledFeatures: ['employeeListNz'],
        urls: {
          employeeListNz: 'employee',
        },
      };

      const actual = getIsNzPayrollOnly(updatedState);
      expect(actual).toEqual(true);
    });
  });

  describe('getShouldDisplayAccountingTaxMenuItem', () => {
    it('true when isCustomizedForNonGstEnabled is false and isRegisteredForGst is true', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: true,
      };
      const actual = getShouldDisplayAccountingTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('true when isCustomizedForNonGstEnabled is false and isRegisteredForGst is false', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: false,
      };
      const actual = getShouldDisplayAccountingTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('true when isCustomizedForNonGstEnabled is true and isRegisteredForGst is true', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
      };
      const actual = getShouldDisplayAccountingTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('false when isCustomizedForNonGstEnabled is true and isRegisteredForGst is false', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: false,
      };
      const actual = getShouldDisplayAccountingTaxMenuItem(state);
      expect(actual).toEqual(false);
    });
  });

  describe('getShouldDisplayOnlineTaxMenu', () => {
    it('false when getIsNzPayrollOnly is true', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: true,
        routeParams: {
          region: 'nz',
        },
        isLoading: false,
        enabledFeatures: ['employeeListNz'],
        urls: {
          employeeListNz: 'employee',
        },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(false);
    });

    it('true when isCustomizedForNonGstEnabled toggle is off', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: true,
        routeParams: {
          region: 'au',
        },
        isLoading: false,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('false when is loading', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
        routeParams: {
          region: 'au',
        },
        isLoading: true,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(false);
    });

    it('true when region is au with gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
        routeParams: {
          region: 'au',
        },
        isLoading: false,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('true when region is nz with gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
        routeParams: {
          region: 'nz',
        },
        isLoading: false,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('true when region is au with non-gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: false,
        routeParams: {
          region: 'au',
        },
        isLoading: false,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(true);
    });

    it('false when region is nz with non-gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: false,
        routeParams: {
          region: 'nz',
        },
        isLoading: false,
        enabledFeatures: ['employeeList'],
        urls: { employeeList: 'employee' },
      };
      const actual = getShouldDisplayOnlineTaxMenuItem(state);
      expect(actual).toEqual(false);
    });
  });

  describe('getOnlineTaxLabel', () => {
    it('"GST and provisional tax" when region is nz and isCustomizedForNonGstEnabled toggle is off', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: true,
        routeParams: {
          region: 'nz',
        },
      };
      const actual = getOnlineTaxLabel(state);
      expect(actual).toEqual('GST and provisional tax');
    });

    it('"GST and provisional tax" when region is nz and isCustomizedForNonGstEnabled toggle is on', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
        routeParams: {
          region: 'nz',
        },
      };
      const actual = getOnlineTaxLabel(state);
      expect(actual).toEqual('GST and provisional tax');
    });

    it('"Prepare BAS or IAS" when region is au and isCustomizedForNonGstEnabled toggle is off', () => {
      const state = {
        isCustomizedForNonGstEnabled: false,
        isRegisteredForGst: true,
        routeParams: {
          region: 'au',
        },
      };
      const actual = getOnlineTaxLabel(state);
      expect(actual).toEqual('Prepare BAS or IAS');
    });

    it('"Prepare BAS or IAS" when region is au and isCustomizedForNonGstEnabled toggle is on and is gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: true,
        routeParams: {
          region: 'au',
        },
      };
      const actual = getOnlineTaxLabel(state);
      expect(actual).toEqual('Prepare BAS or IAS');
    });

    it('"Prepare IAS" when region is au and isCustomizedForNonGstEnabled toggle is on and is non-gst user', () => {
      const state = {
        isCustomizedForNonGstEnabled: true,
        isRegisteredForGst: false,
        routeParams: {
          region: 'au',
        },
      };
      const actual = getOnlineTaxLabel(state);
      expect(actual).toEqual('Prepare IAS');
    });
  });
});
