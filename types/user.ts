import { Level } from "./Level";

export interface RolePermission {
    id: number;
    name: string;
    description: string | null;
  }
  
  export interface Role {
    id: number;
    name: string;
    type: string;
    description: string | null;
    permissions: RolePermission[];
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    status: number,
    role: Role;
    levels:Level[];
  }
