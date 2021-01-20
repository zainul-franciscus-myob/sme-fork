import {
  getEInvoiceAppName,
  getEInvoiceAttachmentsToSend,
  getIsActiveAbn,
  getSendEInvoiceOptions,
  getSendEInvoicePayload,
  getSendEInvoiceUrlParams,
  getShowEInvoiceButton,
} from '../eInvoiceSelectors';
import uuid from '../../../../../common/uuid/uuid';

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

  describe('getIsActiveAbn', () => {
    it.each`
      isAbnLoading | abnStatus    | expected
      ${false}     | ${''}        | ${false}
      ${true}      | ${''}        | ${false}
      ${false}     | ${'Invalid'} | ${false}
      ${true}      | ${'Invalid'} | ${false}
      ${false}     | ${'Active'}  | ${true}
      ${true}      | ${'Active'}  | ${false}
    `(
      'should return $expected if isAvnLoading is "$isAbnLoading" and ABN status is "$abnStatus"',
      ({ isAbnLoading, abnStatus, expected }) => {
        const state = {
          isAbnLoading,
          abn: {
            status: abnStatus,
          },
        };

        const actual = getIsActiveAbn(state);

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

  describe('getEInvoiceAttachmentsToSend', () => {
    describe('should filter failed attachments if any', () => {
      it('return 2 attachments for send e-invoice', () => {
        const attachments = [
          {
            file: 'FILE',
            state: 'finished',
          },
          {
            file: 'FILE',
            state: 'finished',
          },
        ];
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments,
          },
        };

        const actual = getEInvoiceAttachmentsToSend(state);

        expect(actual.length).toEqual(2);
      });

      it('return 1 attachment for send e-invoice', () => {
        const attachments = [
          {
            file: 'FILE',
            state: 'finished',
          },
          {
            file: 'FILE',
            state: 'failed',
          },
        ];
        const state = {
          eInvoice: {
            appName: 'FooBar',
            attachments,
          },
        };

        const actual = getEInvoiceAttachmentsToSend(state);

        expect(actual.length).toEqual(1);
      });
    });
  });

  describe('getSendEInvoicePayload', () => {
    it('should return payload for send e-invoice', () => {
      const attachments = new Array(2).fill({
        file: new File([''], 'filename', { type: 'text/pdf' }),
        state: 'finished',
        key: uuid(),
      });
      const state = {
        eInvoice: {
          appName: 'FooBar',
          attachments,
        },
      };

      const expected = {
        Attachments: attachments.map((attachment) => attachment.file),
      };

      const actual = getSendEInvoicePayload(state);

      expect(actual).toEqual(expected);
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

    it('should return correct payload for send e-invoice modal', () => {
      const attachments = new Array(1).fill({
        file: new File([''], 'filename', { type: 'text/pdf' }),
        state: 'finished',
        key: uuid(),
      });
      const state = {
        abn: { abn: 'Test' },
        invoice: {
          issueDate: '2020-12-15',
          lines: [
            {
              accountId: '190',
              amount: '452',
              description: 'Nintendo switch',
              discount: '0',
              itemId: '5',
              jobId: '17',
              lineTypeId: '19',
              taxAmount: '41.09',
              taxCodeId: '1',
              taxExclusiveAmount: '410.91',
              type: 'item',
              unitOfMeasure: 'qty',
              unitPrice: '452',
              units: '1',
            },
          ],
          isTaxInclusive: true,
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
          freightTaxCodeId: '0',
          amountPaid: '0',
          customerName: 'Tom Cruise',
          invoiceNumber: '00000001',
        },
        eInvoice: {
          appName: 'FooBar',
          attachments,
        },
      };

      const expected = {
        abn: 'Test',
        amountDue: '$452.00',
        customerName: 'Tom Cruise',
        invoiceNumber: '00000001',
        issueDate: '15/12/2020',
        attachments: attachments.map(
          ({ key, file, error, state: attachmentState }) => ({
            key,
            canRemove: true,
            state: attachmentState,
            error,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
          })
        ),
      };

      const actual = getSendEInvoiceOptions(state);
      expect(actual).toMatchObject(expected);
    });
  });
});
