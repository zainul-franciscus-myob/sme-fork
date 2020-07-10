import { LINK_USER, LOAD_BUSINESS_INFORMATION } from '../LinkUserIntents';
import loadBusinessInformation from './data/loadBusinessInformation';

const MemoryLinkUserMapping = {
  [LINK_USER]: ({ onSuccess }) => onSuccess({}),
  [LOAD_BUSINESS_INFORMATION]: ({ onSuccess }) =>
    onSuccess(loadBusinessInformation),
};

export default MemoryLinkUserMapping;
