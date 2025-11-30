import { SetMetadata } from "@nestjs/common";
import { SECRETROLE } from "constants/jwt-key";

export const ROLES_KEY = SECRETROLE;
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);