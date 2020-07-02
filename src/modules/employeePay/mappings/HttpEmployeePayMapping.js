import {
  DELETE_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
  SEND_EMPLOYEE_PAY_REVERSAL_DETAIL,
} from '../employeePayDetail/EmployeePayDetailIntents';
import {
  DELETE_EMPLOYEE_PAY_MODAL,
  LOAD_EMPLOYEE_PAY_MODAL,
  LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
  SEND_EMPLOYEE_PAY_REVERSAL_MODAL,
} from '../employeePayModal/EmployeePayModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../emailPaySlipModal/EmailPaySlipModalIntents';

const HttpEmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
  [DELETE_EMPLOYEE_PAY_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/delete_employee_transaction_detail/${transactionId}`,
  },
  [LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/get_employee_pay_reversal_preview/${transactionId}`,
  },
  [LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/get_employee_pay_reversal_preview/${transactionId}`,
  },
  [DELETE_EMPLOYEE_PAY_MODAL]: {
    method: 'DELETE',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/delete_employee_transaction_detail/${transactionId}`,
  },
  [SEND_EMPLOYEE_PAY_REVERSAL_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employeePay/send_employee_pay_reversal`,
  },
  [SEND_EMPLOYEE_PAY_REVERSAL_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employeePay/send_employee_pay_reversal`,
  },
  [SEND_PAY_SLIP_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/send_employee_pay_email/${transactionId}`,
  },
};

export default HttpEmployeePayMapping;
