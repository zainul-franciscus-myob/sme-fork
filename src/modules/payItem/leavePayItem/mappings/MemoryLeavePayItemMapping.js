import {
  CREATE_LEAVE_PAY_ITEM,
  DELETE_LEAVE_PAY_ITEM,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM,
} from '../LeavePayItemIntents';
import leavePayItem from './data/loadLeavePayItem';
import newLeavePayItem from './data/loadNewLeavePayItem';
import successResponse from './data/success';

const loadLeavePayItem = ({ onSuccess }) => onSuccess(leavePayItem);
const loadNewLeavePayItem = ({ onSuccess }) => onSuccess(newLeavePayItem);
const success = ({ onSuccess }) => onSuccess(successResponse);

const MemoryLeavePayItemMapping = {
  [LOAD_LEAVE_PAY_ITEM]: loadLeavePayItem,
  [LOAD_NEW_LEAVE_PAY_ITEM]: loadNewLeavePayItem,
  [CREATE_LEAVE_PAY_ITEM]: success,
  [UPDATE_LEAVE_PAY_ITEM]: success,
  [DELETE_LEAVE_PAY_ITEM]: success,
};

export default MemoryLeavePayItemMapping;
