import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppHttpClientService} from "../../../infrastructure/AppHttpClient/app-http-client.service";
import {CoreResponseDto} from "../../../domain/abstract/CoreResponseDto";
import {User} from "../../../domain/models/user.model";
import {GetUserDto} from "../../../domain/dto/getUser.dto";
import {CreateUserDto} from "../../../domain/dto/createUser.dto";
import {UpdateUserDto} from "../../../domain/dto/updateUser.dto";


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpClient: AppHttpClientService) {
  }

  getUsers(request: GetUserDto) {
    return this.httpClient.get<CoreResponseDto<User[]>>(`api/users/get-users`, {
      params: {...request}
    });
  }

  addUser(request: CreateUserDto) {
    return this.httpClient.post<CoreResponseDto<undefined>>(`api/users/add`, request);
  }

  updateUser(request: UpdateUserDto) {
    return this.httpClient.put<undefined>(`api/users/update`, request);
  }


  changeState(userId: number) {
    return this.httpClient.put<CoreResponseDto<undefined>>(`api/users/change-state/${userId}`, {});
  }

}
