const isLinkUserPage = (currentUrl) => {
  const { hash } = new URL(currentUrl);
  const params = hash.split('/');
  return params.filter((param) => param.startsWith('linkUser')).length === 1;
};

export default isLinkUserPage;
