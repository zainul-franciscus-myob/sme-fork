import {
  getAttachments,
  getCalculatedTotalsPayload,
  getFilesForUpload,
  getIsBeforeStartOfFinancialYear,
  getIsLineAmountsTaxInclusive,
  getIsReportableDisabled,
  getLineDataByIndexSelector,
  getLinesForTaxCalculation,
  getSaveUrl,
  getShouldShowAbn,
  getShouldShowAccountCode,
  getShouldShowIsTaxInclusiveAndTaxCodeColumn,
  getShowBankStatementText,
  getShowPrefillRecurringButton,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
  getUniqueSelectedJobIds,
} from '../spendMoneyDetailSelectors';
import spendMoneyDetail from './fixtures/spendMoneyDetail';

describe('spendMoneySelectors', () => {
  it('getLineData', () => {
    const getlineDataByIndex = getLineDataByIndexSelector();
    const lineData = getlineDataByIndex(spendMoneyDetail, { index: 0 });
    const accounts = [
      {
        id: '123',
        displayName: 'My Sales Account 1',
        accountType: 'Sales',
        taxCodeId: '123',
        displayId: '1-123',
      },
      {
        id: '456',
        displayName: 'My Assets Account 1',
        accountType: 'Assets',
        taxCodeId: '124',
        displayId: '2-123',
      },
    ];
    const taxCodes = [
      {
        id: '123',
        displayName: 'GST',
        description: 'Goods & Service Tax',
        displayRate: '10%',
      },
      {
        id: '124',
        displayName: 'FRE',
        description: 'GST FREE',
        displayRate: '5%',
      },
    ];

    const expectedData = {
      accountId: '123',
      taxCodeId: '123',
      amount: '100',
      taxAmount: '',
      description: '',
      taxCodes,
      accounts,
    };
    expect(lineData).toEqual(expectedData);
  });

  const spendMoneyPayloadInput = {
    spendMoney: {
      referenceId: 'foo',
      selectedPayFromAccountId: 'bar',
      selectedPayToContactId: 'contactId',
      payFromAccounts: [1, 2, 3, 4],
      date: '12-1-2017',
      description: 'txt',
      isReportable: 'true',
      isTaxInclusive: 'false',
      originalReferenceId: '1234',
      lines: [{ a: 'foo', accounts: [], taxCodes: [] }],
    },
  };

  describe('getSaveUrl', () => {
    const state = {
      businessId: '123',
      region: 'au',
    };

    it('should return transaction list URL if there is no inTrayDocumentId and no modal url', () => {
      const actual = getSaveUrl(state);
      expect(actual).toEqual('/#/au/123/transactionList');
    });

    it('should return in tray url if is creating from in tray and there is no modal url', () => {
      const actual = getSaveUrl({
        ...state,
        spendMoneyId: 'new',
        inTrayDocumentId: 'documentId',
      });
      expect(actual).toEqual('/#/au/123/inTray');
    });

    it('should return modal url if there is modal url', () => {
      const actual = getSaveUrl({
        ...state,
        spendMoneyId: 'new',
        inTrayDocumentId: 'documentId',
        modal: {
          url: 'modalUrl',
        },
      });
      expect(actual).toEqual('modalUrl');
    });
  });

  describe('getSpendMoneyForUpdatePayload', () => {
    it('it removes extraneious fields from the payload', () => {
      const actual = getSpendMoneyForUpdatePayload(spendMoneyPayloadInput);
      expect(actual.payFromAccounts).toBeUndefined();
      expect(actual.payToAccounts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getSpendMoneyForCreatePayload', () => {
    it('it removes extraneious fields from the payload', () => {
      const actual = getSpendMoneyForCreatePayload(spendMoneyPayloadInput);
      expect(actual.payFromAccounts).toBeUndefined();
      expect(actual.payToAccounts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getCalculatedTotalsPayload', () => {
    it('removes extraneous fields from the payload', () => {
      const taxCalcInput = {
        spendMoney: {
          isTaxInclusive: true,
          lines: [
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
          ],
        },
      };
      const actual = getCalculatedTotalsPayload(taxCalcInput);
      expect(actual.isTaxInclusive).not.toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
      expect(actual.lines[1].accounts).toBeUndefined();
      expect(actual.lines[1].taxCodes).toBeUndefined();
    });
  });

  describe('getAttachments', () => {
    it('get attachment list', () => {
      const state = {
        attachments: [
          {
            id: '1',
            name: 'name.pdf',
            size: 1234,
            state: 'queued',
            error: 'too large file',
            isInProgress: true,
          },
          {
            id: '2',
            name: 'name2.pdf',
            size: 1234,
            isInProgress: false,
          },
          {
            id: '3',
            name: 'name3.pdf',
            size: 1000,
            uploadProgress: 0.5,
            state: 'loading',
          },
        ],
      };

      const expected = [
        {
          id: '1',
          name: 'name.pdf',
          size: 1234,
          loaded: 0,
          state: 'queued',
          error: 'too large file',
          canRemove: false,
          isInProgress: true,
        },
        {
          id: '2',
          name: 'name2.pdf',
          size: 1234,
          loaded: 0,
          state: 'default',
          canRemove: true,
          isInProgress: false,
        },
        {
          id: '3',
          name: 'name3.pdf',
          size: 1000,
          loaded: 500,
          state: 'loading',
          canRemove: false,
        },
      ];

      const actual = getAttachments(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilesForUpload', () => {
    it('get files for upload', () => {
      const files = [{ file: 'invalid' }, { file: 'valid' }];

      const state = {
        attachments: [
          {
            file: files[0],
            state: 'failed',
          },
          {
            file: files[1],
            state: 'queued',
          },
          {
            file: { file: 'unknown' },
            state: 'queued',
          },
        ],
      };

      const expected = [files[1]];

      const actual = getFilesForUpload(state, files);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsReportableDisabled', () => {
    it.each([
      ['Customer', true],
      ['Supplier', false],
      ['Employee', true],
      ['Other', true],
    ])(
      'when contact type is %s, it should return %s',
      (contactType, expected) => {
        const id = '1';

        const actual = getIsReportableDisabled.resultFunc(id, contactType);

        expect(actual).toEqual(expected);
      }
    );

    it('should be disabled if contact has not been selected', () => {
      const id = '';
      const contactType = 'Supplier';

      const actual = getIsReportableDisabled.resultFunc(id, contactType);

      expect(actual).toBeTruthy();
    });
  });

  describe('getIsLineAmountsTaxInclusive', () => {
    it('should flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = true;

      const actual = getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      );

      expect(actual).toEqual(false);
    });

    it('should not flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = false;

      const actual = getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      );

      expect(actual).toEqual(true);
    });
  });

  describe('getLinesForTaxCalculation', () => {
    it('should format lines to be useable by the tax calculator', () => {
      const state = {
        spendMoney: {
          lines: [
            {
              id: '1',
              lineSubTypeId: '6',
            },
          ],
        },
      };

      const actual = getLinesForTaxCalculation(state);

      expect(actual[0].lineTypeId).toEqual('6');
    });
  });

  describe('getShouldShowAccountCode', () => {
    it('returns true if is creating and selected contact is a supplier', () => {
      const actual = getShouldShowAccountCode.resultFunc(
        true,
        '2',
        'Supplier',
        true
      );

      expect(actual).toBeTruthy();
    });

    it('returns false if is creating and selected contact is not a supplier', () => {
      const actual = getShouldShowAccountCode.resultFunc(
        true,
        '1',
        'Customer',
        true
      );

      expect(actual).toBeFalsy();
    });

    it('returns false if is not creating', () => {
      const actual = getShouldShowAccountCode.resultFunc(
        false,
        '1',
        'Supplier',
        true
      );

      expect(actual).toBeFalsy();
    });

    it('returns true if prefill from in tray', () => {
      const actual = getShouldShowAccountCode.resultFunc(
        true,
        'contactId',
        'Supplier',
        true
      );

      expect(actual).toBeTruthy();
    });

    it('returns false if not prefill from in tray', () => {
      const actual = getShouldShowAccountCode.resultFunc(
        true,
        'contactId',
        'Supplier',
        false
      );

      expect(actual).toBeFalsy();
    });
  });

  describe('getShowBankStatementText', () => {
    it('should show bank statement text when selected pay to account id matches electronic cleared account id', () => {
      const state = {
        spendMoney: {
          selectedPayFromAccountId: '1',
          electronicClearingAccountId: '1',
        },
      };

      const showBankStatementText = getShowBankStatementText(state);

      expect(showBankStatementText).toEqual(true);
    });

    it("should not show bank statement text when selected pay to account id doesn't match electronic cleared account id", () => {
      const state = {
        spendMoney: {
          selectedPayFromAccountId: '2',
          electronicClearingAccountId: '1',
        },
      };

      const showBankStatementText = getShowBankStatementText(state);

      expect(showBankStatementText).toEqual(false);
    });
  });

  describe('getShouldShowAbn', () => {
    it('should show ABN for 🦘 business', () => {
      const state = {
        abn: '1234',
        region: 'au',
      };
      const shouldShowAbn = getShouldShowAbn(state);

      expect(shouldShowAbn).toEqual(true);
    });

    it('should show ABN for 🇳🇿 business', () => {
      const state = {
        abn: '1234',
        region: 'nz',
      };
      const shouldShowAbn = getShouldShowAbn(state);

      expect(shouldShowAbn).toEqual(false);
    });
  });

  describe('getIsBeforeStartOfFinancialYear', () => {
    it.each([
      ['2014-07-01', '2010-01-01', true],
      ['2014-07-01', '2014-06-30', true],
      ['2014-07-01', '2014-07-01', false],
      ['2014-07-01', '2014-07-02', false],
      ['2014-07-01', '2015-01-01', false],
    ])(
      'when start of financial year date is %s and issue date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          spendMoney: { date },
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getUniqueSelectedJobIds', () => {
    it('should return unique ids only', () => {
      const state = {
        spendMoney: { lines: [{ jobId: 123 }, { jobId: 123 }, { jobId: 1 }] },
      };
      const uniqueIds = getUniqueSelectedJobIds(state);

      expect(uniqueIds).toEqual([123, 1]);
    });

    it('should return empty when no lines', () => {
      const state = {
        spendMoney: { lines: [] },
      };
      const uniqueIds = getUniqueSelectedJobIds(state);

      expect(uniqueIds).toEqual([]);
    });
  });

  describe('getShowPrefillRecurringButton', () => {
    it('shows on new spend money', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(true, true);

      expect(actual).toBeTruthy();
    });

    it('hides when feature toggle is off', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(true, false);

      expect(actual).toBeFalsy();
    });
  });

  describe('getShouldShowIsTaxInclusiveAndTaxCodeColumn', () => {
    it.each([
      [true, true, '1', true],
      [true, true, '4', true],
      [true, false, '1', true],
      [true, false, '4', false],
      [true, false, '', false],
      [true, false, undefined, false],
      [false, true, '4', true],
      [false, true, '4', true],
      [false, false, '1', true],
      [false, false, '4', true],
    ])(
      'when isCustomizedForNonGstEnabled is %s and isRegisteredForGst is %s and taxCodeId is %s, should return %s',
      (isNonGSTEnabled, isRegisteredForGst, taxCodeId, expected) => {
        const modifiedState = {
          isNonGSTEnabled,
          isRegisteredForGst,
          spendMoney: {
            lines: [
              {
                taxCodeId,
              },
            ],
          },
        };

        const actual = getShouldShowIsTaxInclusiveAndTaxCodeColumn(
          modifiedState
        );

        expect(actual).toEqual(expected);
      }
    );
  });
});
