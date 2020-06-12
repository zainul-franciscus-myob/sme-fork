import { LOG_IN, REFRESH_LOG_IN } from '../StsLoginIntents';
import stsToken from './data/PaySuperStsToken';

const MemoryPaySuperStsLoginMapping = {
  [LOG_IN]: ({ onSuccess }) => onSuccess(stsToken),
  [REFRESH_LOG_IN]: ({ onSuccess }) => onSuccess(stsToken),
};

export default MemoryPaySuperStsLoginMapping;
