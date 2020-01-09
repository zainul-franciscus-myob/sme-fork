import {
  CREATE_TEMPLATE,
  LOAD_TEMPLATE,
  UPDATE_TEMPLATE,
} from '../TemplateIntents';
import loadTemplateResponse from './data/loadTemplateResponse';
import saveTemplateResponse from './data/saveTemplateResponse';

const loadTemplate = ({ onSuccess }) => onSuccess(loadTemplateResponse);
const updateTemplate = ({ onSuccess }) => onSuccess(saveTemplateResponse);
const createTemplate = ({ onSuccess }) => onSuccess(saveTemplateResponse);

const MemoryTemplateMapping = {
  [LOAD_TEMPLATE]: loadTemplate,
  [CREATE_TEMPLATE]: createTemplate,
  [UPDATE_TEMPLATE]: updateTemplate,
};

export default MemoryTemplateMapping;
