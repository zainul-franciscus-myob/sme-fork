import HttpIntegration from './HttpIntegration';

export default () => {
  const getToken = () => {
    return Date.now();
  };

  const getAuthHeaders = () => {
    return {
      'Authorization': 'bearer=' + getToken(),
    };
  };

  return HttpIntegration(getAuthHeaders);
};
