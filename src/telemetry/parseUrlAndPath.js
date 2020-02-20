const parseString = (string) => {
  const pathSegments = string.split('/');

  const pathWithOnlyNumberIds = pathSegments.filter(
    (pathSegment) => {
      const regexPattern = '^[0-9]*';
      const startsWithNumber = pathSegment.match(regexPattern);
      return Boolean(startsWithNumber[0]);
    },
  );

  const updatedPathSegments = pathSegments.map((pathSegment, index) => {
    if (pathWithOnlyNumberIds.includes(pathSegment)) {
      const regexPattern = '^[0-9]*';
      const numberPartOfPathSegment = pathSegment.match(regexPattern);

      /*
        There is an assumption being made that for a given route, the unique id associated with
        a particular domain (e.g. an id for a quote), will always be at the start of a path segment.
      */

      const restOfPathSegment = pathSegment.slice(numberPartOfPathSegment[0].length);
      return `${pathSegments[index - 1]}Detail${restOfPathSegment}`;
    }
    return pathSegment;
  });

  return updatedPathSegments.join('/');
};

export const parseUrl = (url, businessId) => {
  const urlWithoutBusinessId = businessId ? url.replace(`/${businessId}`, '') : url;
  const urlWithoutHash = urlWithoutBusinessId.replace('/#', '');
  return parseString(urlWithoutHash);
};

export const parsePath = (path, businessId) => {
  const pathWithoutBusinessId = businessId ? path.replace(`/${businessId}`, '') : path;
  const pathWithoutHash = pathWithoutBusinessId.replace('#', '');
  return parseString(pathWithoutHash);
};
