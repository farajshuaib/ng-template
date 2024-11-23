import {Permission} from "./permission.model";
import {UserRole} from "../constant/UserRole";

export interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  state: number;
  permissions: Permission[];
}
