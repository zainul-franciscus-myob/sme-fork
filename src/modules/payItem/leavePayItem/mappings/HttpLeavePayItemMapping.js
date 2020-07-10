import {
  CREATE_LEAVE_PAY_ITEM,
  DELETE_LEAVE_PAY_ITEM,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM,
} from '../LeavePayItemIntents';

const HttpLeavePayItemMapping = {
  [LOAD_NEW_LEAVE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/leavePayItem/load_new_leave_pay_item`,
  },
  [LOAD_LEAVE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, leavePayItemId }) =>
      `/${businessId}/leavePayItem/load_leave_pay_item/${leavePayItemId}`,
  },
  [CREATE_LEAVE_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/leavePayItem/create_new_leave_pay_item`,
  },
  [UPDATE_LEAVE_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, leavePayItemId }) =>
      `/${businessId}/leavePayItem/update_leave_pay_item/${leavePayItemId}`,
  },
  [DELETE_LEAVE_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, leavePayItemId }) =>
      `/${businessId}/leavePayItem/delete_leave_pay_item/${leavePayItemId}`,
  },
};

export default HttpLeavePayItemMapping;
