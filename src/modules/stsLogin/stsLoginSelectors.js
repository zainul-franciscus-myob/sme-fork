export const getIsOpen = (state) => state.isOpen;
export const getIsLoading = (state) => state.isLoading;
export const getAlert = (state) => state.alert;
export const getEmail = (state) => state.email;
export const getPassword = (state) => state.password;
export const getBusinessId = (state) => state.businessId;
export const getLogInContent = (state) => ({
  email: state.email,
  password: state.password,
});
