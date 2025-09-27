// src/types/common.ts
export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'SUPERADMIN';

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: Role;
}
