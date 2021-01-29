import { GET_SERIAL_NUMBER } from '../MoveToMYOBIntents';

const HttpMoveToMYOBMapping = {
  [GET_SERIAL_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/moveToMYOB/load_serial_number`,
  },
};

export default HttpMoveToMYOBMapping;
