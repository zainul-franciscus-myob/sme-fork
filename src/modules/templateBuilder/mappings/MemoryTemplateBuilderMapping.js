import { LOAD_DEFAULT_TEMPLATE } from '../TemplateBuilderIntents';
import loadTemplateResponse from './data/loadTemplateResponse';

const loadTemplate = ({ onSuccess }) => onSuccess(loadTemplateResponse);

const MemoryTemplateMapping = {
  [LOAD_DEFAULT_TEMPLATE]: loadTemplate,
};

export default MemoryTemplateMapping;
