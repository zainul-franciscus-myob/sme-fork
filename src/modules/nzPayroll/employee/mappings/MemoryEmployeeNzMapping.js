import * as intents from '../EmployeeNzIntents';
import createEmployeeResponse from './data/createEmployeeResponse';
import employeeDetailResponse from './data/employeeDetailEntry';
import employeeListFilterResponse from './data/filterEmployeeList.json';
import employeeListResponse from './data/employeeList';
import loadNewEmployeeResponse from './data/loadNewEmployeeResponse';
import success from './data/success';
import updatedEmployeeDetailResponse from './data/updateEmployeeDetailResponse';

const loadEmployeeList = ({ onSuccess }) => onSuccess(employeeListResponse);
const loadEmployeeListNextPage = ({ onSuccess }) =>
  onSuccess(employeeListResponse);
const loadEmployeeDetail = ({ onSuccess }) => onSuccess(employeeDetailResponse);
const updateEmployee = ({ onSuccess }) => {
  onSuccess(updatedEmployeeDetailResponse);
};
const deleteEmployee = ({ onSuccess }) => {
  onSuccess(success);
};
const loadNewEmployee = ({ onSuccess }) => {
  onSuccess(loadNewEmployeeResponse);
};
const createEmployee = ({ onSuccess }) => {
  onSuccess(createEmployeeResponse);
};

const sortAndFilterEmployeeList = ({ onSuccess }) =>
  onSuccess(employeeListFilterResponse);

const EmployeeListNzMapping = {
  [intents.LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [intents.LOAD_EMPLOYEE_LIST_NEXT_PAGE]: loadEmployeeListNextPage,
  [intents.LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [intents.UPDATE_EMPLOYEE]: updateEmployee,
  [intents.DELETE_EMPLOYEE]: deleteEmployee,
  [intents.LOAD_NEW_EMPLOYEE_DETAIL]: loadNewEmployee,
  [intents.CREATE_EMPLOYEE]: createEmployee,
  [intents.SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
};

export default EmployeeListNzMapping;
