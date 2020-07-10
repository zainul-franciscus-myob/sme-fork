import {
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SUBMIT_BUSINESS_DETAILS,
} from '../stpErrorsIntents';
import loadBusinessDetails from './data/loadBusinessDetails';
import loadStpErrors from './data/loadStpErrors';

const StpErrorsMapping = {
  [LOAD_STP_ERRORS]: ({ onSuccess }) => onSuccess(loadStpErrors),
  [LOAD_BUSINESS_DETAILS]: ({ onSuccess }) => onSuccess(loadBusinessDetails),
  [SUBMIT_BUSINESS_DETAILS]: ({ onSuccess }) => onSuccess(),
};

export default StpErrorsMapping;
