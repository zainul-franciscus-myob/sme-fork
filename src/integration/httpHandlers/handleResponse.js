const handleError = (error, onFailure) => error.name !== 'AbortError' && onFailure(error);

class BadResponseStatusCodeError extends Error { }

const handleResponse = async ({
  fetchedPromise,
  responseParser,
  onSuccess,
  onFailure,
  onForbidden,
}) => {
  try {
    const response = await fetchedPromise;

    if (response.status >= 400) {
      const responseBody = await response.json();

      if (response.status === 403) {
        onForbidden(responseBody);
        return;
      }

      throw new BadResponseStatusCodeError(responseBody.message);
    }

    const payload = await responseParser(response);
    onSuccess(payload);
  } catch (error) {
    handleError(error, onFailure);
  }
};

export default handleResponse;
