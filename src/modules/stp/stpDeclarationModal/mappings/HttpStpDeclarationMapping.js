import { RECORD_STP_DECLARATION } from '../StpDeclarationModalIntents';

const HttpStpDeclarationMapping = {
  [RECORD_STP_DECLARATION]: {
    method: 'POST',
    getPath: ({ businessId, eventId }) => `/${businessId}/stp/${eventId}/declaration`,
  },
};

export default HttpStpDeclarationMapping;
