import { LOAD_AGENT_CONTACT_INFO, SUBMIT_AGENT_CONTACT_INFO } from '../stpYourRoleIntents';
import loadAgentContact from './data/loadAgentContact';

const StpYourRoleMapping = {
  [LOAD_AGENT_CONTACT_INFO]: ({ onSuccess }) => (
    onSuccess(loadAgentContact)
  ),
  [SUBMIT_AGENT_CONTACT_INFO]: ({ onSuccess }) => onSuccess(),
};

export default StpYourRoleMapping;
