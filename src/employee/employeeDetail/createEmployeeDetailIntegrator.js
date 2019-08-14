import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE,
  CREATE_SUPER_FUND,
  CREATE_SUPER_PAY_ITEM_MODAL,
  DELETE_EMPLOYEE,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_NEW_SUPER_PAY_ITEM_MODAL,
  LOAD_SUPER_PAY_ITEM_MODAL,
  LOAD_TAX_PAY_ITEM_MODAL,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_EMPLOYEE,
  UPDATE_SUPER_PAY_ITEM_MODAL,
  UPDATE_TAX_PAY_ITEM_MODAL,
} from '../EmployeeIntents';
import {
  getBusinessId,
  getEmployeeId,
  getEmployeePayload,
  getIsCreating,
} from './selectors/EmployeeDetailSelectors';
import {
  getDeductionPayItemModalId,
  getDeductionPayItemModalPayload,
  getIsDeductionPayItemModalCreating,
} from './selectors/DeductionPayItemModalSelectors';
import { getIsSuperPayItemModalCreating, getSuperPayItemModalId, getSuperPayItemModalSuperPayItem } from './selectors/SuperPayItemModalSelectors';
import { getSuperFund, getSuperFundAbn } from './selectors/SuperFundModalSelectors';
import { getTaxPayItemPayload } from './selectors/PayrollTaxSelectors';

const createEmployeeDetailIntegrator = (store, integration) => ({
  loadEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_EMPLOYEE_DETAIL
      : LOAD_EMPLOYEE_DETAIL;

    const businessId = getBusinessId(state);
    const employeeId = isCreating ? undefined : getEmployeeId(state);

    const urlParams = { businessId, employeeId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrUpdateEmployee: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_EMPLOYEE
      : UPDATE_EMPLOYEE;

    const businessId = getBusinessId(state);
    const employeeId = isCreating ? undefined : getEmployeeId(state);
    const urlParams = { businessId, employeeId };

    const content = getEmployeePayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteEmployee: ({ onSuccess, onFailure }) => {
    const intent = DELETE_EMPLOYEE;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getEmployeeId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadTaxPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_TAX_PAY_ITEM_MODAL;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveTaxPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_TAX_PAY_ITEM_MODAL;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getTaxPayItemPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadDeductionPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsDeductionPayItemModalCreating(state);

    const intent = isCreating
      ? LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL
      : LOAD_DEDUCTION_PAY_ITEM_MODAL;

    const businessId = getBusinessId(state);
    const payItemId = isCreating ? undefined : getDeductionPayItemModalId(state);

    const urlParams = { businessId, payItemId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrUpdateDeductionPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsDeductionPayItemModalCreating(state);

    const intent = isCreating
      ? CREATE_DEDUCTION_PAY_ITEM_MODAL
      : UPDATE_DEDUCTION_PAY_ITEM_MODAL;

    const businessId = getBusinessId(state);
    const payItemId = isCreating ? undefined : getDeductionPayItemModalId(state);
    const urlParams = { businessId, payItemId };

    const content = getDeductionPayItemModalPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadSuperFundModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_NEW_SUPER_FUND;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAbnDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_DETAIL;

    const urlParams = {
      businessId: getBusinessId(state),
      abn: getSuperFundAbn(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveSuperFundModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = CREATE_SUPER_FUND;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getSuperFund(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadSuperPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsSuperPayItemModalCreating(state);

    const intent = isCreating
      ? LOAD_NEW_SUPER_PAY_ITEM_MODAL
      : LOAD_SUPER_PAY_ITEM_MODAL;

    const urlParams = {
      businessId: getBusinessId(state),
      superPayItemId: getSuperPayItemModalId(state),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  createOrUpdateSuperPayItemModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsSuperPayItemModalCreating(state);

    const intent = isCreating
      ? CREATE_SUPER_PAY_ITEM_MODAL
      : UPDATE_SUPER_PAY_ITEM_MODAL;

    const urlParams = {
      businessId: getBusinessId(state),
      superPayItemId: getSuperPayItemModalId(state),
    };

    const content = getSuperPayItemModalSuperPayItem(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeeDetailIntegrator;
