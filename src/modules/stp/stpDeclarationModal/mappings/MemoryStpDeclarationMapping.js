import { RECORD_STP_DECLARATION } from '../StpDeclarationModalIntents';

const MemoryStpDeclarationMapping = {
  [RECORD_STP_DECLARATION]: ({ onSuccess }) => onSuccess(),
};

export default MemoryStpDeclarationMapping;
