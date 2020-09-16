import {
  CLOSE_MODAL,
  CONVERT_TO_PRE_CONVERSION_BILL,
  OPEN_MODAL,
  SET_SHOW_PRE_CONVERSION_ALERT,
} from '../BillIntents';
import { setUpWithRun } from './BillModule.test.js';
import ModalType from '../types/ModalType';

describe('BillDetailModule_PreConversion', () => {
  describe('validate is pre conversion', () => {
    it('should open convert to preconversion modal if is pre conversion', () => {
      const { module, integration, store } = setUpWithRun();
      module.updateBillOption({ key: 'issueDate', value: '2000-01-01' });
      store.resetActions();
      integration.resetRequests();

      module.validateIssueDate();
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: ModalType.PreConversionBill,
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('should do nothing if not pre conversion', () => {
      const { module, integration, store } = setUpWithRun();
      module.updateBillOption({ key: 'issueDate', value: '2020-01-01' });
      store.resetActions();
      integration.resetRequests();

      module.validateIssueDate();
      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('confirm convert to pre conversion', () => {
    const { module, integration, store } = setUpWithRun();
    module.updateBillOption({ key: 'issueDate', value: '2020-01-01' });
    module.validateIssueDate();
    store.resetActions();
    integration.resetRequests();

    module.convertToPreConversionBill();

    expect(store.getActions()).toEqual([
      { intent: CONVERT_TO_PRE_CONVERSION_BILL },
      { intent: CLOSE_MODAL },
      { intent: SET_SHOW_PRE_CONVERSION_ALERT, showPreConversionAlert: true },
    ]);
    expect(integration.getRequests()).toEqual([]);
  });
});
