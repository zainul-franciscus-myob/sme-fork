import { LOAD_AGENT_CONTACT_INFO, SUBMIT_AGENT_CONTACT_INFO } from '../stpYourRoleIntents';

const StpYourRoleMapping = {
  [LOAD_AGENT_CONTACT_INFO]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/agent_contact`,
  },
  [SUBMIT_AGENT_CONTACT_INFO]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/agent_contact`,
  },
};

export default StpYourRoleMapping;
