import {ContentState} from "../../../domain/models/contentState.model";
import {IUserState} from "./users.type";
import {UserRole} from "../../../domain/constant/UserRole";
import {UserState} from "../../../domain/constant/userState";


export const UsersState: IUserState = {
  users: [],
  contentState: new ContentState(),
  selectedUser: null,
  selectedUserRole: UserRole.User,
  selectedUserState: UserState.All
};
