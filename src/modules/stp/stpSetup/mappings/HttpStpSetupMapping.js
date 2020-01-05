import StpDeclarationInformationMapping from '../stepModules/DeclarationInformation/mappings/HttpStpDeclarationInformationMapping';
import StpYourRoleMapping from '../stepModules/StpYourRole/mappings/HttpStpYourRoleMapping';

const StpSetupMapping = {
  ...StpYourRoleMapping,
  ...StpDeclarationInformationMapping,
};

export default StpSetupMapping;
