import {
  CREATE_TEMPLATE,
  LOAD_TEMPLATE,
  UPDATE_TEMPLATE,
} from '../TemplateIntents';

const HttpTemplateMapping = {
  [CREATE_TEMPLATE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/documents/templates`,
  },
  [UPDATE_TEMPLATE]: {
    method: 'PUT',
    getPath: ({ businessId, templateId }) => `/${businessId}/documents/templates/${templateId}`,
  },
  [LOAD_TEMPLATE]: {
    method: 'GET',
    getPath: ({ businessId, templateName }) => `/${businessId}/documents/templates/${templateName}`,
  },
};

export default HttpTemplateMapping;
