import {
  LOAD_DEFAULT_TEMPLATE,
} from '../TemplateBuilderIntents';

const HttpTemplateMapping = {
  [LOAD_DEFAULT_TEMPLATE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/documents/templates/load_default_template`,
  },
};

export default HttpTemplateMapping;
