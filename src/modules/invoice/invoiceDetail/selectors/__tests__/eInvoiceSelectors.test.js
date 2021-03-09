import {
  getEInvoiceAppName,
  getEInvoiceAttachmentsToSend,
  getInvalidAbnNzbnModalText,
  getIsActiveAbnOrNzbn,
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
      ${'FooBar'} | ${'nz'} | ${true}
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

  describe('getIsActiveAbnOrNzbn', () => {
    it.each`
      isAbnLoading | abnStatus    | nzbn      | region  | expected
      ${false}     | ${''}        | ${''}     | ${'au'} | ${false}
      ${true}      | ${''}        | ${''}     | ${'au'} | ${false}
      ${false}     | ${'Invalid'} | ${''}     | ${'au'} | ${false}
      ${true}      | ${'Invalid'} | ${''}     | ${'au'} | ${false}
      ${false}     | ${'Active'}  | ${''}     | ${'au'} | ${true}
      ${true}      | ${'Active'}  | ${''}     | ${'au'} | ${false}
      ${false}     | ${''}        | ${''}     | ${'nz'} | ${false}
      ${false}     | ${''}        | ${'blah'} | ${'nz'} | ${true}
    `(
      'should return $expected if isAbnLoading is "$isAbnLoading" and ABN status is "$abnStatus" and NZBN is "$nzbn" and region is "$region"',
      ({ isAbnLoading, abnStatus, nzbn, region, expected }) => {
        const state = {
          isAbnLoading,
          abn: {
            status: abnStatus,
          },
          nzbn,
          region,
        };

        const actual = getIsActiveAbnOrNzbn(state);

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
      [null, null, {}],
      [{}, null, {}],
      [
        { abn: { abn: 'Test', branch: 'Blah' } },
        'au',
        { subHeading: 'ABN', value: 'Test' },
      ],
    ])(
      'given abn state of "%o" and region "%s" it should return "%s"',
      (abn, region, expectedAbn) => {
        const state = {
          emailInvoice: {
            fromEmail: 'email@email.com',
          },
          serialNumber: 'test',
          eInvoice: {
            appName: 'FooBar',
            attachments: [],
          },
          region,
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
          abnNzbn: expectedAbn,
        };

        expect(actual).toMatchObject(expected);
      }
    );

    it('should return correct payload for send e-invoice modal', () => {
      const attachments = new Array(1).fill({
        file: new File([''], 'filename', { type: 'text/pdf' }),
        state: 'finished',
        key: uuid(),
      });
      const state = {
        abn: { abn: 'Test' },
        region: 'au',
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
        abnNzbn: {
          subHeading: 'ABN',
          value: 'Test',
        },
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

  describe('getInvalidAbnNzbnModalText', () => {
    const auResponse = {
      title: 'Invalid or empty ABN',
      body:
        "You can't send this as an e-invoice as the customer does not have a valid ABN entered.",
    };

    const nzResponse = {
      title: 'Invalid or empty NZBN',
      body:
        "You can't send this as an e-invoice as the customer does not have a valid NZBN entered.",
    };

    it.each([
      [null, auResponse],
      ['au', auResponse],
      ['nz', nzResponse],
    ])(
      'given region state of "%s" it should return "%o"',
      (region, expected) => {
        const state = {
          region,
        };

        const actual = getInvalidAbnNzbnModalText(state);

        expect(expected).toEqual(actual);
      }
    );
  });
});
