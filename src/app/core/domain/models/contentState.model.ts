import {CoreContentStatus} from "../constant/CoreContentStatus";
import {CoreContentState} from "../abstract/CoreContentState";


export class ContentState implements CoreContentState {
  private readonly _message: string;
  private readonly _status: CoreContentStatus;

  public get message(): string {
    return this._message;
  }

  public get status(): CoreContentStatus {
    return this._status;
  }


  constructor(message: string = "", status: CoreContentStatus = CoreContentStatus.pure) {
    this._message = message;
    this._status = status;
  }

}
