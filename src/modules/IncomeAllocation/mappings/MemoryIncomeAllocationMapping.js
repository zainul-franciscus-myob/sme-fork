import {
  LOAD_INCOME_ALLOCATION,
  SAVE_INCOME_ALLOCATION,
} from '../IncomeAllocationIntents';
import incomeAllocationReadResponse from './data/loadIncomeAllocation';
import successResponse from './data/success.json';

const readIncomeAllocation = ({ onSuccess }) =>
  onSuccess(incomeAllocationReadResponse);

const saveIncomeAllocation = ({ onSuccess }) => onSuccess(successResponse);

const MemoryIncomeAllocationMapping = {
  [LOAD_INCOME_ALLOCATION]: readIncomeAllocation,
  [SAVE_INCOME_ALLOCATION]: saveIncomeAllocation,
};

export default MemoryIncomeAllocationMapping;
