import {AuthState} from "./auth.type";
import {ContentState} from "../../../domain/models/contentState.model";


export const authState: AuthState = {
  userData: null,
  contentState: new ContentState(),
};
