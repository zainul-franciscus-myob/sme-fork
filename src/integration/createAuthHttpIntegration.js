import { acquireToken } from '../Auth';
import createHttpIntegration from './createHttpIntegration';

const createAuthHttpIntegration = () => {
  const getAdditionalHeaders = async () => {
    const token = await acquireToken();

    return {
      Authorization: `bearer ${token}`,
    };
  };

  return createHttpIntegration({
    getAdditionalHeaders,
  });
};

export default createAuthHttpIntegration;
