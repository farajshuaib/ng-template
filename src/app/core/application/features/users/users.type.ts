import {CoreContentState} from "../../../domain/abstract/CoreContentState";
import {User} from "../../../domain/models/user.model";
import {UserRole} from "../../../domain/constant/UserRole";
import {UserState} from "../../../domain/constant/userState";


export type IUserState = {
  contentState: CoreContentState;
  users: User[];
  selectedUser: User | null;
  selectedUserRole: UserRole;
  selectedUserState: UserState

};
