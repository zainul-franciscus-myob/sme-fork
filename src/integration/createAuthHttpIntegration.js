import { getToken } from '../Auth';
import createHttpIntegration from './createHttpIntegration';

const createAuthHttpIntegration = () => {
  const getAuthHeaders = () => ({
    Authorization: `bearer ${getToken()}`,
  });

  return createHttpIntegration(getAuthHeaders);
};

export default createAuthHttpIntegration;
