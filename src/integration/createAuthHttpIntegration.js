import { acquireToken } from '../Auth';
import createHttpIntegration from './createHttpIntegration';

const createAuthHttpIntegration = () => {
  const getAuthHeaders = async () => {
    const token = await acquireToken();

    return {
      Authorization: `bearer ${token}`,
    };
  };

  return createHttpIntegration(getAuthHeaders);
};

export default createAuthHttpIntegration;
