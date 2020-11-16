import {
  getEInvoiceAppName,
  getEnableEInvoiceButton,
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
      appName     | expected
      ${'FooBar'} | ${true}
      ${''}       | ${false}
      ${' '}      | ${false}
    `(
      'should show $expected when appName is "$appName"',
      ({ appName, expected }) => {
        const state = {
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

  describe('getEnableEInvoiceButton', () => {
    it.each`
      appName   | isAbnLoading | abnStatus    | expected
      ${''}     | ${false}     | ${''}        | ${false}
      ${'test'} | ${true}      | ${''}        | ${false}
      ${'test'} | ${false}     | ${'Invalid'} | ${false}
      ${'test'} | ${false}     | ${'Active'}  | ${true}
    `(
      'should return $expected if appName is "$appName", isAvnLoading is "$isAbnLoading" and ABN status is "$abnStatus"',
      ({ appName, isAbnLoading, abnStatus, expected }) => {
        const state = {
          emailInvoice: {
            fromEmail: 'email@email.com',
          },
          serialNumber: 'test',
          eInvoice: {
            appName,
            attachments: [],
          },
          isAbnLoading,
          abn: {
            status: abnStatus,
          },
        };

        const actual = getEnableEInvoiceButton(state);

        expect(actual).toEqual(expected);
      }
    );
  });
});
