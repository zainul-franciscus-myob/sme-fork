import { CONFIRM_LICENCE } from '../LicenceIntents';

const MemoryLicenceMapping = {
  [CONFIRM_LICENCE]: ({ onSuccess }) => onSuccess(),
};

export default MemoryLicenceMapping;
