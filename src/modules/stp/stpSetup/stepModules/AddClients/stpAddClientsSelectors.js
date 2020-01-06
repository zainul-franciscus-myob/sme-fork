import Role from '../../Role';

export const getAgentRoleText = (state) => {
  if (state.agentRole === Role.TAX_AGENT) {
    return 'Tax agent';
  }
  return 'BAS agent';
};

export const getATOInstructionsLink = (state) => {
  if (state.agentRole === Role.TAX_AGENT) {
    return 'https://www.ato.gov.au/Tax-professionals/Tax-Agent-Portal/Using-the-Tax-Agent-Portal/Your-clients/Adding-and-removing-a-client/';
  }
  return 'https://www.ato.gov.au/Tax-professionals/BAS-Agent-Portal/Using-the-BAS-Agent-Portal/Your-clients/Adding-and-removing-clients/';
};

export const getAgentPortalLink = (state) => {
  if (state.agentRole === Role.TAX_AGENT) {
    return 'https://tap.ato.gov.au/';
  }
  return 'https://basp.ato.gov.au/';
};
