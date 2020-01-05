import { LOAD_BUSINESS_CONTACT_INFORMATION, SUBMIT_BUSINESS_CONTACT_INFORMATION } from '../StpDeclarationInformationIntents';
import loadBusinessContactInformation from './data/loadBusinessContactInformation';

const StpDeclarationInformationMapping = {
  [LOAD_BUSINESS_CONTACT_INFORMATION]: ({ onSuccess }) => onSuccess(loadBusinessContactInformation),
  [SUBMIT_BUSINESS_CONTACT_INFORMATION]: ({ onSuccess }) => onSuccess(),
};

export default StpDeclarationInformationMapping;
