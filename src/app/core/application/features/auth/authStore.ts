import {computed, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service/auth.service';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {AuthenticateDto} from "../../../domain/dto/authenticate.dto";
import {authState} from "./auth.state";
import {CoreContentStatus} from "../../../domain/constant/CoreContentStatus";
import {ContentState} from "../../../domain/models/contentState.model";
import {Router} from "@angular/router";
import {RoutesName} from "../../../domain/constant/ERoutesName";
import {Permission} from "../../../domain/models/permission.model";



export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(authState),
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({

    async login(request: AuthenticateDto) {
      patchState(store, {
        contentState: {message: '', status: CoreContentStatus.loading},
      });
      try {
        const response = await authService.login(request);
        authService.setAccessToken(response.content.token);
        authService.setRefreshToken(response.content.refreshToken);
        patchState(store, {
          contentState: {
            message: response.message,
            status: CoreContentStatus.success,
          },
        });
        await router.navigate([RoutesName.DASHBOARD]);
      } catch (e: any) {
        patchState(store, {
          contentState: {
            message: e?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.error,
          }
        });
      }
    },

    async refreshToken() {
      try {
        const response = await authService.refreshToken();
        authService.setAccessToken(response.content.accessToken);
        authService.setRefreshToken(response.content.refreshToken);
        return response;
      } catch (e) {
        throw e;
      }
    },

    logout() {
      try {
        authService.logout();
        patchState(store, {
          contentState: {
            message: 'تم تسجيل الخروج',
            status: CoreContentStatus.success,
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async getProfile() {
      try {
        const response = await authService.profile();
        patchState(store, {
          userData: response.content,
        });
      } catch (error: any) {
        patchState(store, {
          contentState: {
            message: error?.error?.message || 'حدث خطأ ما',
            status: CoreContentStatus.pure,
          },
        });
      }
    },


    hasPermissions(allowedPermissions: Permission[]): boolean {
      const state = getState(store);
      if (!state.userData) return false;
      // return allowedPermissions.some((permission) => state.userData?.permissions.includes(permission));'
      return true;
    }

  })),


  withComputed((state) => ({
    contentState: computed(() => state.contentState() as ContentState),
  }))
);
