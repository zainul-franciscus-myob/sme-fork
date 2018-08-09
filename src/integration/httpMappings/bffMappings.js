import bankingMappings from "./bankingMappings";
import petMappings from "./petMappings";
import journalMappings from "./journalMappings";

export default Object.freeze(Object.assign(
  petMappings,
  bankingMappings,
  journalMappings
));
