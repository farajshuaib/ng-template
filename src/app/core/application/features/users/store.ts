import {effect, Inject, inject} from '@angular/core';
import {
  patchState,
  signalStore, withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {CoreContentStatus} from '../../../domain/constant/CoreContentStatus';
import {UsersState} from "./users.state";
import {UsersService} from "../../services/users.service/users.service";
import {User} from "../../../domain/models/user.model";
import {UserRole} from "../../../domain/constant/UserRole";
import {CreateUserDto} from "../../../domain/dto/createUser.dto";
import {UpdateUserDto} from "../../../domain/dto/updateUser.dto";
import {UserState} from "../../../domain/constant/userState";

export const UserStore = signalStore(
  {providedIn: 'root'},
  withState(UsersState),
  withMethods((store, service = inject(UsersService)) => ({
    async getUsers(selectedUserState: UserState) {
      try {
        patchState(store, {
          contentState: {message: '', status: CoreContentStatus.loading},
        });
        const response = await service.getUsers({
          request: selectedUserState!
        });
        patchState(store, {
          users: response.content,
          contentState: {
            message: response.message,
            status: CoreContentStatus.pure,
          },
        });
      } catch (error: any) {
        patchState(store, {
          contentState: {
            message: error?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          },
        });
      }
    },

    getUsersById(id: number) {
      patchState(store, {
        contentState: {message: '', status: CoreContentStatus.pure},
      });
      // get from list
      return store
        .users()
        .find((user) => user.id == id);
    },

    async createUser(request: CreateUserDto) {
      try {
        patchState(store, {
          contentState: {message: '', status: CoreContentStatus.loading},
        });
        const response = await service.addUser(request);
        patchState(store, {
          contentState: {
            message: response.message,
            status: CoreContentStatus.success,
          },
        });
      } catch (error: any) {
        patchState(store, {
          contentState: {
            message: error?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          },
        });
        throw error;
      }
    },

    async updateUser(request: UpdateUserDto) {
      try {
        patchState(store, {
          contentState: {message: '', status: CoreContentStatus.loading},
        });
        await service.updateUser(request);
        patchState(store, {
          contentState: {
            message: "تم تحديث المستخدم",
            status: CoreContentStatus.success,
          },
        });
      } catch (error: any) {
        patchState(store, {
          contentState: {
            message: error?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          },
        });
        throw error;
      }
    },

    setSelectedUser(user: User) {
      patchState(store, {
        selectedUser: user,
      });
    },

    setSelectedUserRole(role: UserRole) {
      patchState(store, {
        selectedUserRole: role,
      });
    },

    setSelectedUserState(state: UserState) {
      patchState(store, {
        selectedUserState: state,
      });
    },

    async changeUserState(userId: number) {
      try {
        await service.changeState(userId);
      } catch (error: any) {
        throw error;
      }
    }
  })),


  withHooks(({selectedUserState, getUsers}) => {
    return {
      onInit() {
        effect(() => {
          if (selectedUserState()) {
            getUsers(selectedUserState())

          }
        }, {allowSignalWrites: true});
      },
    };
  }),
);
