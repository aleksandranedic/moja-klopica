import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Role = (role: 'Admin' | 'Client' | 'Owner') =>
  SetMetadata(ROLES_KEY, role);
