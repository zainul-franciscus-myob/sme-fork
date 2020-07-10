import {
  CONVERT_TO_PRE_CONVERSION_INVOICE,
  SET_MODAL_TYPE,
  SET_SHOW_PRE_CONVERSION_ALERT,
} from '../../InvoiceIntents';
import { setupWithRun } from './InvoiceDetailModule.test';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';

describe('InvoiceDetailModule_PreConversion', () => {
  describe('validate is pre conversion', () => {
    it('should open convert to preconversion modal if is pre conversion', () => {
      const { module, integration, store } = setupWithRun();
      module.updateHeaderOptions({ key: 'issueDate', value: '2010-01-01' });
      store.resetActions();
      integration.resetRequests();

      module.validateIssueDate();
      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: InvoiceDetailModalType.CREATE_PRE_CONVERSION_INVOICE,
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('should do nothing if not pre conversion', () => {
      const { module, integration, store } = setupWithRun();
      module.updateHeaderOptions({ key: 'issueDate', value: '2020-01-01' });
      store.resetActions();
      integration.resetRequests();

      module.validateIssueDate();
      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('confirm convert to pre conversion', () => {
    const { module, integration, store } = setupWithRun();
    module.updateHeaderOptions({ key: 'issueDate', value: '2020-01-01' });
    module.validateIssueDate();
    store.resetActions();
    integration.resetRequests();

    module.convertToPreConversionInvoice();

    expect(store.getActions()).toEqual([
      { intent: CONVERT_TO_PRE_CONVERSION_INVOICE },
      { intent: SET_MODAL_TYPE, modalType: InvoiceDetailModalType.NONE },
      { intent: SET_SHOW_PRE_CONVERSION_ALERT, showPreConversionAlert: true },
    ]);
    expect(integration.getRequests()).toEqual([]);
  });
});
