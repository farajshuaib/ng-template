import {PermissionState} from "./permission.type";
import {ContentState} from "../../../domain/models/contentState.model";


export const permissionState: PermissionState = {
  permissions: [],
  contentState: new ContentState(),
};
