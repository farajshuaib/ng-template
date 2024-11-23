import {User} from "../../../domain/models/user.model";
import {CoreContentState} from "../../../domain/abstract/CoreContentState";

export type AuthState = {
  contentState: CoreContentState;
  userData: User | null;
};
