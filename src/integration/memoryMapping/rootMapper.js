import petMapping from "./petMapping"
import bankingMapping from "./bankingMapping"

const allMappings = Object.freeze(Object.assign(bankingMapping, petMapping));

export default allMappings