const handleError = (error, onRejected) => error.name !== 'AbortError' && onRejected(error);

const handleResponse = async (fetchedPromise, onFulfilled, onRejected) => {
  let response;
  let payload;

  try {
    response = await fetchedPromise;
  } catch (error) {
    handleError(error, onRejected);
    return;
  }

  if (response.status >= 400) {
    try {
      const responseBody = await response.json();
      onRejected({ message: responseBody.message });
    } catch (error) {
      handleError(error, onRejected);
      return;
    }
    return;
  }

  try {
    payload = await response.json();
  } catch (error) {
    handleError(error, onRejected);
    return;
  }

  onFulfilled(payload);
};

export default handleResponse;
