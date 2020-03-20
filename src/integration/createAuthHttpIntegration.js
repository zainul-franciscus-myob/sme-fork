import { acquireToken } from '../Auth';
import createHttpIntegration from './createHttpIntegration';

const createAuthHttpIntegration = ({ getRegion }) => {
  const getAdditionalHeaders = async () => {
    const token = await acquireToken();

    return {
      Authorization: `bearer ${token}`,
    };
  };

  return createHttpIntegration({
    getRegion,
    getAdditionalHeaders,
  });
};

export default createAuthHttpIntegration;
