import {User} from "../../../domain/models/user.model";
import {CoreContentState} from "../../../domain/abstract/CoreContentState";
import {Permission} from "../../../domain/models/permission.model";

export type PermissionState = {
  contentState: CoreContentState;
  permissions: Permission[];
};
