const permissionDeniedHandler = {
  handle: ({ businessId }) => {
    window.location.href = `/#/au/${businessId}/permissionDenied`;
  },
  canHandle: response => response.status === 403,
};

export default permissionDeniedHandler;
