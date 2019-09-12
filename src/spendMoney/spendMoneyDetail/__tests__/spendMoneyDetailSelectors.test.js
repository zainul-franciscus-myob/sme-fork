import {
  getAttachments,
  getCalculatedTotalsPayload,
  getFilesForUpload,
  getLineDataByIndexSelector,
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
});
