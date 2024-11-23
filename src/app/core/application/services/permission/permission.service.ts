import {Injectable, OnInit} from '@angular/core';
import {AssignPermissionDto} from "../../../domain/dto/assignPermission.dto";
import {CoreResponseDto} from "../../../domain/abstract/CoreResponseDto";
import {AppHttpClientService} from "../../../infrastructure/AppHttpClient/app-http-client.service";
import {Permission} from "../../../domain/models/permission.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private readonly httpClient: AppHttpClientService) {
  }


  assignPermission(request: AssignPermissionDto) {
    return this.httpClient.put<CoreResponseDto<undefined>>(`api/Permissions/assign-permission`, request);
  }

  getPermissions() {
    return this.httpClient.get<CoreResponseDto<Permission[]>>(`api/Permissions/permissions`)
  }
}
