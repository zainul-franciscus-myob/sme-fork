const getRouteNameToModuleMapping = routes => routes
  .reduce((acc, { name, module, documentTitle }) => ({
    ...acc,
    [name]: {
      module,
      title: documentTitle,
    },
  }), {});

export default getRouteNameToModuleMapping;
