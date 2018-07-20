import bankingMappings from "./bankingMappings";
import petMappings from "./petMappings";

export default Object.freeze(Object.assign(
  petMappings,
  bankingMappings
));