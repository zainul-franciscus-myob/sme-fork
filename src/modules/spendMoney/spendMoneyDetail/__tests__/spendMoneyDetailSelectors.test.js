import {
  getAttachments,
  getCalculatedTotalsPayload,
  getFilesForUpload,
  getIsContactReportable,
  getIsLineAmountsTaxInclusive,
  getIsReportableDisabled,
  getLineDataByIndexSelector,
  getLinesForTaxCalculation,
  getSaveUrl,
  getShouldReloadModule,
  getShouldShowAccountCode,
  getShowBankStatementText,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
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
      payToContacts: [1, 2, 3, 4],
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
      const files = [
        { file: 'invalid' },
        { file: 'valid' },
      ];

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

  describe('getIsContactReportable', () => {
    it.each([
      ['when isReportable is true, it should return true', '1', true],
      ['when isReportable is false, it should return false', '2', false],
      ['when isReportable is undefined, it should return undefined', '3', undefined],
      ['when contact does not exists, it should return undefined', '4', undefined],
    ])('%s', (scenario, contactId, expected) => {
      const state = {
        spendMoney: {
          payToContacts: [
            { id: '1', isReportable: true },
            { id: '2', isReportable: false },
            { id: '3' },
          ],
        },
      };

      const actual = getIsContactReportable(state, contactId);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsReportableDisabled', () => {
    it.each([
      ['Customer', true],
      ['Supplier', false],
      ['Employee', true],
      ['Other', true],
    ])('when contact type is %s, it should return %s', (contactType, expected) => {
      const id = '1';
      const contacts = [{ id, contactType }];

      const actual = getIsReportableDisabled.resultFunc(contacts, id);

      expect(actual).toEqual(expected);
    });

    it('should be disabled if contact has not been selected', () => {
      const id = '';
      const contacts = [{ id: '1', contactType: 'Supplier' }];

      const actual = getIsReportableDisabled.resultFunc(contacts, id);

      expect(actual).toBeTruthy();
    });
  });

  describe('getIsLineAmountsTaxInclusive', () => {
    it('should flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = true;

      const actual = getIsLineAmountsTaxInclusive(isTaxInclusive, isSwitchingTaxInclusive);

      expect(actual).toEqual(false);
    });

    it('should not flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = false;

      const actual = getIsLineAmountsTaxInclusive(isTaxInclusive, isSwitchingTaxInclusive);

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
    const payToContacts = [
      {
        contactType: 'Customer',
        id: '1',
      },
      {
        contactType: 'Supplier',
        id: '2',
      },

    ];

    it('returns true if is creating and selected contact is a supplier', () => {
      const state = {
        spendMoneyId: 'new',
        spendMoney: {
          selectedPayToContactId: '2',
          payToContacts,
        },
      };

      const actual = getShouldShowAccountCode(state);
      expect(actual).toBeTruthy();
    });

    it('returns false if is creating and selected contact is not a supplier', () => {
      const state = {
        spendMoneyId: 'new',
        spendMoney: {
          selectedPayToContactId: '1',
          payToContacts,
        },
      };

      const actual = getShouldShowAccountCode(state);
      expect(actual).toBeFalsy();
    });

    it('returns false if is not creating', () => {
      const state = {
        spendMoneyId: '1',
        spendMoney: {
          selectedPayToContactId: '1',
          payToContacts,
        },
      };

      const actual = getShouldShowAccountCode(state);
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

    it('should not show bank statement text when selected pay to account id doesn\'t match electronic cleared account id', () => {
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

  describe('getShouldReloadModule', () => {
    it('should not reload when editing existing record', () => {
      const state = {
        isCreating: false,
        selectedBankAccountId: '1',
        selectedDate: '01/01/2020',
        spendMoney: {
          selectedPayFromAccountId: '1',
          date: '01/01/2020',
        },
      };
      expect(getShouldReloadModule(state)).toEqual(false);
    });
    it('should not reload when save and duplicate', () => {
      const state = {
        isCreating: false,
        selectedBankAccountId: '1',
        duplicatedSpendMoneyId: '1',
        selectedDate: '01/01/2020',
        spendMoney: {
          selectedPayFromAccountId: '1',
          date: '01/01/2020',
        },
      };
      expect(getShouldReloadModule(state)).toEqual(false);
    });
    it('should not reload when selected bank account changed', () => {
      const state = {
        isCreating: true,
        selectedBankAccountId: '2',
        selectedDate: '01/01/2020',
        spendMoney: {
          selectedPayFromAccountId: '1',
          date: '01/01/2020',
        },
      };
      expect(getShouldReloadModule(state)).toEqual(false);
    });
    it('should not reload when issue date changed', () => {
      const state = {
        isCreating: true,
        selectedBankAccountId: '1',
        selectedDate: '01/01/2020',
        spendMoney: {
          selectedPayFromAccountId: '1',
          date: '01/02/2020',
        },
      };
      expect(getShouldReloadModule(state)).toEqual(false);
    });
  });
});
