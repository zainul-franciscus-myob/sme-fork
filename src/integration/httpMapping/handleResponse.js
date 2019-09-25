const handleError = (error, onFailure) => error.name !== 'AbortError' && onFailure(error);

class BadResponseStatusCodeError extends Error {}

const handleResponse = async (fetchedPromise, responseParser, onSuccess, onFailure) => {
  try {
    const response = await fetchedPromise;

    if (response.status >= 400) {
      const responseBody = await response.json();
      throw new BadResponseStatusCodeError(responseBody.message);
    }

    const payload = await responseParser(response);

    onSuccess(payload);
  } catch (error) {
    handleError(error, onFailure);
  }
};

export default handleResponse;
