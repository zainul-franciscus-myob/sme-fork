const getRouteNameToModuleMapping = routes => routes
  .reduce((acc, { name, module, documentTitle }) => {
    const action = (context) => { module.run(context); };

    return {
      ...acc,
      [name]: {
        module,
        action,
        title: documentTitle,
      },
    };
  }, {});

export default getRouteNameToModuleMapping;
