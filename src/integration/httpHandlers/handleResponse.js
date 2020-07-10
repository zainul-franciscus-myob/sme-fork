import handleErrorResponse from './handleErrorResponse';

const handleError = (error, onFailure) =>
  error.name !== 'AbortError' && onFailure(error);

const handleResponse = async ({
  fetchedPromise,
  responseParser,
  onSuccess,
  onFailure,
  urlParams,
}) => {
  try {
    const response = await fetchedPromise;

    if (response.status >= 400) {
      const responseBody = await response.json();
      handleErrorResponse({ response, responseBody, urlParams });

      onFailure(responseBody);
      return;
    }

    const payload = await responseParser(response);
    onSuccess(payload);
  } catch (error) {
    handleError(error, onFailure);
  }
};

export default handleResponse;
