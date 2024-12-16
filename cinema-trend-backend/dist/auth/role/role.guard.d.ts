import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    matchRole(roles: string[], userRole: string): boolean;
    canActivate(context: ExecutionContext): boolean;
}
