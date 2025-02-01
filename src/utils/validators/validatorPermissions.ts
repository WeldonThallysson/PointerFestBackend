import { TypesAccess } from "../../keys/typeAccess/typesAccess";

interface IValidatorPermissions {
    typeAccess: string,
}


export const validatorPermissions = ({typeAccess}: IValidatorPermissions) => {
  return (typeAccess === TypesAccess.Owner || typeAccess === TypesAccess.Developer || typeAccess === TypesAccess.Master || typeAccess === TypesAccess.Admin)
 
}
