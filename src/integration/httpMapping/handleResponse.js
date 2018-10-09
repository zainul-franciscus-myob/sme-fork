/**
 * @param {Promise<Response>} fetchedPromise
 * @param {(payload: any) => any} onFulfilled
 * @param {(Error: Object) => any} onRejected
 */
const handleResponse = async (fetchedPromise, onFulfilled, onRejected) => {
  /** @type {Response} response */
  let response;
  let payload;

  try {
    response = await fetchedPromise;
  } catch (error) {
    onRejected(error);
    return;
  }

  if (response.status >= 400) {
    try {
      const responseBody = await response.json();
      onRejected({ message: responseBody.message });
    } catch (error) {
      onRejected(error);
      return;
    }
    return;
  }

  try {
    payload = await response.json();
  } catch (error) {
    onRejected(error);
    return;
  }

  onFulfilled(payload);
};

export default handleResponse;
