import { GET_SERIAL_NUMBER } from '../MoveToMYOBIntents';

const MemoryMoveToMYOBMapping = {
  [GET_SERIAL_NUMBER]: ({ onSuccess }) =>
    onSuccess({ serialNumber: '000000000000' }),
};

export default MemoryMoveToMYOBMapping;
