import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<String[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log('User Role:', user);
        const hasRole = requiredRoles.some(role => role == user.roleName);
        console.log('User Role:', hasRole);
        if (!hasRole) {
            throw new ForbiddenException("No tienes los permisos necesarios para acceder a este recurso");
        }
        return true;
    }
}