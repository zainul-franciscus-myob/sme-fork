import {
  getEInvoiceAppName,
  getSendEInvoiceOptions,
  getSendEInvoiceUrlParams,
  getShowEInvoiceButton,
} from '../eInvoiceSelectors';

describe('eInvoiceSelectors', () => {
  describe('getEInvoiceAppName', () => {
    it('should return the APP name from the state', () => {
      const state = {
        emailInvoice: {
          fromEmail: 'email@email.com',
        },
        serialNumber: 'test',
        eInvoice: {
          appName: 'FooBar',
          attachments: [],
        },
      };

      const actual = getEInvoiceAppName(state);

      expect(actual).toEqual('FooBar');
    });
  });

  describe('getShowEInvoiceButton', () => {
    it.each`
      appName     | region  | expected
      ${'FooBar'} | ${'au'} | ${true}
      ${'FooBar'} | ${'nz'} | ${false}
      ${''}       | ${'au'} | ${false}
      ${''}       | ${'nz'} | ${false}
      ${' '}      | ${'au'} | ${false}
      ${' '}      | ${'nz'} | ${false}
    `(
      'should show $expected when appName is "$appName" and region is "$region"',
      ({ appName, region, expected }) => {
        const state = {
          region,
          emailInvoice: {
            fromEmail: 'email@email.com',
          },
          serialNumber: 'test',
          eInvoice: {
            appName,
            attachments: [],
          },
        };

        const actual = getShowEInvoiceButton(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getSendEInvoiceUrlParams', () => {
    it('should return url params for send e-invoice', () => {
      const state = {
        businessId: 'abc',
        invoiceId: '1',
      };

      const actual = getSendEInvoiceUrlParams(state);

      expect(actual).toEqual({
        businessId: 'abc',
        invoiceId: '1',
      });
    });
  });

  describe('getSendEInvoiceOptions', () => {
    it.each([
      [null, ''],
      [{}, ''],
      [{ abn: { abn: 'Test', branch: 'Blah' } }, 'Test'],
    ])('given abn state of "%o" it should return "%s"', (abn, expectedAbn) => {
      const state = {
        emailInvoice: {
          fromEmail: 'email@email.com',
        },
        serialNumber: 'test',
        eInvoice: {
          appName: 'FooBar',
          attachments: [],
        },
        invoice: {
          isTaxInclusive: false,
          taxExclusiveFreightAmount: 0,
          freightTaxAmount: 0,
          freightTaxCodeId: 1,
          lines: [],
        },
        ...abn,
      };

      const actual = getSendEInvoiceOptions(state);
      const expected = {
        abn: expectedAbn,
      };

      expect(actual).toMatchObject(expected);
    });
  });
});
