import au from './au.json';
import nz from './nz.json';

const regions = {
  au,
  nz,
};

const getRegionToDialectText = region => (string) => {
  const selectedTextMapping = regions[region.toLowerCase()];

  return selectedTextMapping ? selectedTextMapping[string] : '';
};

export default getRegionToDialectText;
