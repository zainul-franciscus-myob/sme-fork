import {
  DELETE_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
} from '../employeePayDetail/EmployeePayDetailIntents';
import {
  DELETE_EMPLOYEE_PAY_MODAL,
  LOAD_EMPLOYEE_PAY_MODAL,
  LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
} from '../employeePayModal/EmployeePayModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../emailPaySlipModal/EmailPaySlipModalIntents';
import loadEmployeePayDetail from './data/loadEmployeePayDetail';
import loadEmployeeReversal from './data/loadEmployeePayReversalPreviewDetail';

const MemoryEmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_MODAL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL]: ({ onSuccess }) => onSuccess(loadEmployeeReversal),
  [LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeeReversal),
  [DELETE_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess({ message: 'Successfully deleted an employee pay transaction' }),
  [DELETE_EMPLOYEE_PAY_MODAL]: ({ onSuccess }) => onSuccess({ message: 'Successfully deleted an employee pay transaction' }),
  [SEND_PAY_SLIP_EMAIL]: ({ onSuccess }) => onSuccess({}),
};

export default MemoryEmployeePayMapping;
