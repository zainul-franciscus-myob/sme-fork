const parseString = (string) => {
  const pathSegments = string.split('/');
  const regexPatternForId = '^[0-9]*';
  const regexPatternForGuid =
    '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

  const segmentsWithIdsOrGuids = pathSegments.filter((pathSegment) => {
    const isId = pathSegment.match(regexPatternForId);
    const isGuid = pathSegment.match(regexPatternForGuid);
    return Boolean(isId[0]) || isGuid;
  });

  const updatedPathSegments = pathSegments.map((pathSegment, index) => {
    if (segmentsWithIdsOrGuids.includes(pathSegment)) {
      /*
        There is an assumption being made that for a given route, the unique id associated with
        a particular domain (e.g. an id for a quote), will always be at the start of a path segment.
      */

      const isGuid = pathSegment.match(regexPatternForGuid);
      if (isGuid) {
        const restOfPathSegmentForGuid = pathSegment.slice(isGuid[0].length);
        return `${pathSegments[index - 1]}Detail${restOfPathSegmentForGuid}`;
      }

      const numberPartOfPathSegment = pathSegment.match(regexPatternForId);
      const restOfPathSegment = pathSegment.slice(
        numberPartOfPathSegment[0].length
      );
      return `${pathSegments[index - 1]}Detail${restOfPathSegment}`;
    }
    return pathSegment;
  });

  return updatedPathSegments.join('/');
};

export const parseUrl = (url, businessId) => {
  const urlWithoutBusinessId = businessId
    ? url.replace(`/${businessId}`, '')
    : url;
  const urlWithoutHash = urlWithoutBusinessId.replace('/#', '');
  return parseString(urlWithoutHash);
};

export const parsePath = (path, businessId) => {
  const pathWithoutBusinessId = businessId
    ? path.replace(`/${businessId}`, '')
    : path;
  const pathWithoutHash = pathWithoutBusinessId.replace('#', '');
  return parseString(pathWithoutHash);
};
