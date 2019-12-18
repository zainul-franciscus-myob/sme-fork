import {
  LOAD_INCOME_ALLOCATION, SAVE_INCOME_ALLOCATION,
} from '../../modules/IncomeAllocation/IncomeAllocationIntents';
import incomeAllocationReadResponse from '../data/IncomeAllocation/loadIncomeAllocation';
import successResponse from '../data/success';

const readIncomeAllocation = ({ onSuccess }) => onSuccess(incomeAllocationReadResponse);

const saveIncomeAllocation = ({ onSuccess }) => onSuccess(successResponse);

const IncomeAllocationMapping = {
  [LOAD_INCOME_ALLOCATION]: readIncomeAllocation,
  [SAVE_INCOME_ALLOCATION]: saveIncomeAllocation,
};

export default IncomeAllocationMapping;
