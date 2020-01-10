import {
  CREATE_TEMPLATE,
  LOAD_NEW_TEMPLATE,
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
    getPath: ({ businessId, templateName }) => `/${businessId}/documents/templates/load_template/${templateName}`,
  },
  [LOAD_NEW_TEMPLATE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/documents/templates/load_new_template`,
  },
};

export default HttpTemplateMapping;
