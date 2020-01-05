import StpDeclarationInformationMapping from '../stepModules/DeclarationInformation/mappings/MemoryStpDeclarationInformationMapping';
import StpYourRoleMapping from '../stepModules/StpYourRole/mappings/MemoryStpYourRoleMapping';


const StpSetupMapping = {
  ...StpYourRoleMapping,
  ...StpDeclarationInformationMapping,
};

export default StpSetupMapping;
