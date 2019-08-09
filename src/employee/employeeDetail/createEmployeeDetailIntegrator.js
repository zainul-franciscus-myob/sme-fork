import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_TAX_PAY_ITEM_MODAL,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_EMPLOYEE,
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
});

export default createEmployeeDetailIntegrator;
