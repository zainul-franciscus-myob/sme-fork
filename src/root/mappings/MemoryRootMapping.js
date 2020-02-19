import { LOAD_SUBSCRIPTION } from '../rootIntents';
import loadSubscriptionResponse from './data/subscription.json';

const MemoryRootMapping = {
  [LOAD_SUBSCRIPTION]: ({ onSuccess }) => onSuccess(loadSubscriptionResponse),
};

export default MemoryRootMapping;
