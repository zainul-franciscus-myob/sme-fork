import {
  LINK_USER, LOAD_BUSINESS_INFORMATION,
} from '../../linkUser/LinkUserIntents';
import loadBusinessInformation from '../data/linkUser/loadBusinessInformation.json';

const LinkUserMapping = {
  [LINK_USER]: ({ onSuccess }) => onSuccess({}),
  [LOAD_BUSINESS_INFORMATION]: ({ onSuccess }) => onSuccess(loadBusinessInformation),
};

export default LinkUserMapping;
